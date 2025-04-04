const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'database-1.ct64se8ooimh.us-east-2.rds.amazonaws.com',  // ← your actual RDS endpoint (NO https!)
    user: 'admin',
    password: 'HTI24-25',
    database: 'lead_contamination',
    port: 3306, // default for MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
