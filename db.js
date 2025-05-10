require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool(); // Automatically uses environment variables

module.exports = {
  query: (text, params) => pool.query(text, params),
};