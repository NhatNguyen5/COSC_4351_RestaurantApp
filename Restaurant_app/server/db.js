const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "WhenTheyCry",
  host: "localhost",
  port: 5432,
  database: "4351"
});

module.exports = pool;