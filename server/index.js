const express = require("express");
const cores = require("cores");
const app = express();
const client = require("./config/databaseConnection");
const dotenv = require("dotenv");
const rateLimiter = require("./middleware/ratelimiter");
const indexRoute = require("./routes/index.route");

dotenv.config();

app.use(express.json());
// app.use(cores());

const port = process.env.PORT;
app.use("/", rateLimiter, indexRoute);

app.listen(port, () => {
  console.log(`app running in ${port}`);
});
