const { pool } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const createJob = async (job) => {
  const { title, description, category, location, salary, createdBy } = job;
  const query = `
    INSERT INTO jobs (id, title, description, category, location, salary, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [
    uuidv4(),
    title,
    description,
    category,
    location,
    salary,
    createdBy,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllJobs = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );
  return rows;
};

const getJobById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
  return rows[0];
};

const updateJob = async (id, job) => {
  const { title, description, category, location, salary } = job;
  const query = `
    UPDATE jobs
    SET title = $1, description = $2, category = $3, location = $4, salary = $5, updated_at = NOW()
    WHERE id = $6
    RETURNING *
  `;
  const values = [title, description, category, location, salary, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteJob = async (id) => {
  await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
