const { Pool } = require("pg");
const config = require("./env");

const pool = new Pool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.name,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
  process.exit(-1);
});

const connectDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB connected:", res.rows[0].now);
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB,
};
