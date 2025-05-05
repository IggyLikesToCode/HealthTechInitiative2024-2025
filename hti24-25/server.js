const express = require('express');
const cors = require('cors');
const db = require('./db');
const mysql = require('mysql2')
const app = express();
app.use(cors());
app.use(express.json());
const axios = require("axios");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({ region: "us-east-2" });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "AWSBucketforHTI", // change to your actual S3 bucket name
        acl: "public-read",
        key: function (req, file, cb) {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, filename);
        }
    })
});

app.post("/upload", upload.single("image"), async (req, res) => {
    const imageUrl = req.file.location;
    const reportId = req.body.reportId;

    try {
        await db.query(
            "UPDATE lead_reports SET img_path = ? WHERE id = ?",
            [imageUrl, reportId]
        );
        res.json({ success: true, imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database update failed" });
    }
});


db.query('SELECT 1')
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err.message);
    });

app.get("/api/get-map-levels", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT latitude, longitude, level FROM data_for_lead_old");
        res.json(rows);
    } catch (err) {
        console.error("Error querying data:", err.message);
        res.status(500).json({ error: "Error retrieving data" });
    }
});

app.get("/api/get-open-source-data", async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT latitude, longitude, level FROM data_for_lead_new_crowdsourced"
        );
        res.json(rows);
    } catch (err) {
        console.error("Error fetching open-source data:", err.message);
        res.status(500).json({ error: "Failed to fetch open-source data." });
    }
});

app.post("/api/report-lead", async (req, res) => {
    const {
        location_name,
        level,
        date,
        latitude,
        longitude,
        reported_by = "anonymous",
    } = req.body;

    try {
        const sql = `
            INSERT INTO data_for_lead_new_crowdsourced 
            (location_name, latitude, longitude, level, date_tested, reported_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [location_name, latitude, longitude, level, date, reported_by];

        await db.execute(sql, values);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error inserting lead report:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});



app.listen(3001, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:3001');
});
