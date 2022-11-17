const Pool = require('pg').Pool;

let host;
let databaseName;
let password;

if(process.argv[2] == "local") {
   host = "localhost";
   databaseName = process.env.DATABASE_NAME;
   password = process.env.DB_PASSWORD;
} else {
   host = "postgres";
   databaseName = "sproutshare";
   password = "postgres";
}
/**
 * Please read these comments carefully!
 */
const pool = new Pool({
   user: "postgres",
   // You will have to enter your user password here at this time
   // it is recommended to change your password to something you dont use, currently mine is 1234
   // use the following script when logged into psql to do this
   // ALTER ROLE postgres WITH PASSWORD '1234';
   // you can also use $env:PGPASSWORD='1234' in powershell to avoid entering your password everytime you use psql

   // *UPDATE* in order to use process.env you must declare a .env file in the root backend-server and declare your environment variables there
   // My .env file is 2 lines:
   // DATABASE_NAME="SproutShare"
   // DB_PASSWORD="password"
   password: password || "1234",
   host: host,
   port: 5432,
   // this is your db name!
   database: databaseName || "SproutShare-dev-1"
});

module.exports = pool;