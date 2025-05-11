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

const upload = multer();
app.post("/upload", upload.single("image"), async (req, res) => {
  const reportId = req.body.reportId;
  const file = req.file;

  if (!file || !reportId) {
    return res.status(400).json({ success: false, message: "Missing file or reportId" });
  }

  const params = {
    Bucket: "awsbucketforhti",
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(params).promise();
    const imageUrl = data.Location;

    await db.query("UPDATE lead_reports SET img_path = ? WHERE id = ?", [
      imageUrl,
      reportId,
    ]);

    res.json({ success: true, imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, error: "Failed to upload image" });
  }
});


app.post("/send-email", async (req, res) => {
  const { name, email, address, reason } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Lead Kit Request" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Lead Test Kit Request",
      html: `
          <h2>New Request Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Reason:</strong> ${reason || "N/A"}</p>
        `,
    });

    res.status(200).json({ message: "Email sent successfully." });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

db.query("SELECT 1")
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
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
    const values = [
      location_name,
      latitude,
      longitude,
      level,
      date,
      reported_by,
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
  console.log("Server is running on http://localhost:3001");
});
