const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "vivian408796",
  host: "localhost",
  port: 5432,
  database: "4351"
});

module.exports = pool;