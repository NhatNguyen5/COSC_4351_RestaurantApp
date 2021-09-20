const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "narutoif",
  host: "localhost",
  port: 5432,
  database: "4353"
});

module.exports = pool;