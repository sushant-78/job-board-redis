const { Pool } = require("pg");
const { dbUrl } = require("./env");

const pool = new Pool({
  connectionString: dbUrl,
  max: 20, // max concurrent clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error:", err);
  process.exit(-1);
});

const connectDB = () => {
  pool.query("SELECT 1", (err) => {
    if (err) {
      console.error("PostgreSQL connection test failed");
      process.exit(1);
    }
  });
};

module.exports = {
  pool,
  connectDB,
};
