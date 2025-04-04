const express = require('express');
const cors = require('cors');
const db = require('./db');

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

// 🚀 Start server
app.listen(3001, '0.0.0.0', () => {
    console.log('🚀 Server is running on http://localhost:3000');
});
