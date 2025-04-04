const express = require('express');
const cors = require('cors');
const db = require('./db');
const mysql = require('mysql2')
const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Test DB connection on startup
db.query('SELECT 1')
    .then(() => {
        console.log('✅ Successfully connected to the database');
    })
    .catch((err) => {
        console.error('❌ Failed to connect to the database:', err.message);
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


// 🚀 Start server
app.listen(3001, '0.0.0.0', () => {
    console.log('🚀 Server is running on http://localhost:3001');
});
