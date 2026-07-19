const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "dm_hmtika",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    const [rows, fields] = await pool.query(text, params);
    if (Array.isArray(rows)) {
      return { rows, rowCount: rows.length, fields };
    }
    return { rows: [], rowCount: rows.affectedRows || 0, insertId: rows.insertId, affectedRows: rows.affectedRows };
  },
  pool,
};
