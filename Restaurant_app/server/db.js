const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Your Password Here",
  host: "localhost",
  port: 5432,
  database: "Your Database Here"
});

module.exports = pool;