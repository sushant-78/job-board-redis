const { pool } = require("../config/db");

const createUser = async (user) => {
  const { id, name, email, password } = user;
  const query = `
    INSERT INTO users (id, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, created_at
  `;
  const values = [id, name, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;

  const { rows } = await pool.query(query, [email]);

  return rows[0];
};

module.exports = { createUser, findUserByEmail };
