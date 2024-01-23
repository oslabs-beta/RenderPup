// Import the required module
require('dotenv').config();
const { Pool } = require("pg");

// Create a new instance of the Pool class with the connection string
const pool = new Pool({
  // connectionString: process.env.PG_URI,
  connectionString: "postgres://jiqfyjks:J7YT1ETixxGzmguaGKoaiQ0L4Gp1guv9@heffalump.db.elephantsql.com/jiqfyjks"
});
// PG_URI = "postgres://jiqfyjks:J7YT1ETixxGzmguaGKoaiQ0L4Gp1guv9@heffalump.db.elephantsql.com/jiqfyjks";
// Export the pool object to be used in other modules
module.exports = {
  query: (text, params, callback) => {
    console.log("Executed query:", text);
    // Fix the syntax error by defining query as a function
    return pool.query(text, params, callback);
  },
};
