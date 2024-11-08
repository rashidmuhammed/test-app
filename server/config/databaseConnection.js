const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  host: process.env.HOST,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
};

const client = new pg.Client(config);

client.connect((err) => {
  if (!err) {
    console.log("Connected to the database");
  } else {
    console.error("Something went wrong, not connected:", err.message);
  }
});

module.exports = client;
