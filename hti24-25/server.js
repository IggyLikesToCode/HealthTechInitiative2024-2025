const express = require("express");
const cors = require("cors");
const db = require("./db");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());
const axios = require("axios");
const AWS = require("aws-sdk");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./credentials.env" });
const s3 = new AWS.S3({ region: "us-east-2" });




const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10 mb max
const heicConvert = require("heic-convert");

app.post("/api/upload", upload.single("image"), async (req, res) => {
    const reportId = req.body.reportId;
    const file = req.file;

    if (!file || !reportId) {
        return res.status(400).json({ success: false, message: "Missing file or reportId" });
    }

    let fileBuffer = file.buffer;
    let contentType = file.mimetype;
    let fileExtension = file.originalname.split('.').pop().toLowerCase();
    let fileName = file.originalname;

    // ✅ If file is HEIC, convert to JPEG
    if (contentType === "image/heic" || contentType === "image/heif" || fileExtension === "heic" || fileExtension === "heif") {
        try {
            console.log("Converting HEIC → JPEG...");
            const outputBuffer = await heicConvert({
                buffer: fileBuffer, // the HEIC buffer
                format: "JPEG",     // convert to JPEG
                quality: 0.9        // 0–1 quality scale
            });
            fileBuffer = outputBuffer;
            contentType = "image/jpeg";
            fileName = file.originalname.replace(/\.[^/.]+$/, ".jpg"); // rename .heic → .jpg
        } catch (convertErr) {
            console.error("HEIC conversion failed:", convertErr);
            return res.status(500).json({ success: false, message: "HEIC conversion failed" });
        }
    }

    const params = {
        Bucket: "awsbucketforhti",
        Key: `uploads/${Date.now()}_${fileName}`,
        Body: fileBuffer,
        ContentType: contentType,
    };

    try {
        const data = await s3.upload(params).promise();
        const imageUrl = data.Location;

        await db.query(
            "UPDATE data_for_lead_new_crowdsourced SET img_path = ? WHERE id = ?",
            [imageUrl, reportId]
        );

        res.json({ success: true, imageUrl });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ success: false, error: "Failed to upload image" });
    }
});
app.get("/api/get-map-levels", async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT latitude, longitude, level FROM data_for_lead_old"
        );
        res.json(rows);
    } catch (err) {
        console.error("Error querying data:", err.message);
        res.status(500).json({ error: "Error retrieving data" });
    }
});

app.get("/api/get-open-source-data", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT latitude, longitude, level FROM data_for_lead_new_crowdsourced WHERE verified = 1"
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
    test_kit_used
  } = req.body;

  try {
    const sql = `
            INSERT INTO data_for_lead_new_crowdsourced 
            (location_name, latitude, longitude, level, date_tested, reported_by, test_kit_used)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      location_name,
      latitude,
      longitude,
      level,
      date,
      reported_by,
      test_kit_used,
    ];


    const [result] = await db.execute(sql, values);
    const insertedId = result.insertId;
    res.status(200).json({ success: true, reportId: insertedId });
  } catch (err) {
    console.error("Error inserting lead report:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running on https://localhost:3001");
});
