require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function runMigrations() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "dm_hmtika",
    port: parseInt(process.env.DB_PORT || "3306"),
    multipleStatements: true,
  });

  const migrationsDir = path.join(__dirname, ".db", "migrations");
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  console.log(`Found ${files.length} migration files`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");
    console.log(`Running ${file}...`);
    try {
      await pool.query(sql);
      console.log(`  ✓ ${file} done`);
    } catch (err) {
      console.error(`  ✗ ${file} failed:`, err.message);
    }
  }

  await pool.end();
  console.log("\nAll migrations completed.");
}

runMigrations().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
