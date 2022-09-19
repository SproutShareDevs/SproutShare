const Pool = require('pg').Pool;

const pool = new Pool({
   user: "postgres",
   password: "", //whats the best way to do this? this does not seem right
   host: "localhost",
   port: 5432,
   database: ""
});

module.exports = pool;