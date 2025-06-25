const { pool } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const createApplication = async (application) => {
  const {
    jobId,
    applicantName,
    applicantEmail,
    resumeUrl,
    coverLetter,
    createdBy,
  } = application;
  const query = `
    INSERT INTO job_applications
    (id, job_id, applicant_name, applicant_email, resume_url, cover_letter, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [
    uuidv4(),
    jobId,
    applicantName,
    applicantEmail,
    resumeUrl,
    coverLetter,
    createdBy,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getApplicationsByJobId = async (jobId) => {
  const query =
    "SELECT * FROM job_applications WHERE job_id = $1 ORDER BY created_at DESC";
  const { rows } = await pool.query(query, [jobId]);
  return rows;
};

module.exports = { createApplication, getApplicationsByJobId };
