const express = require("express");
const cors = require("cors");
const app = express();
const client = require("./config/databaseConnection");
const dotenv = require("dotenv");
const rateLimiter = require("./middleware/ratelimiter");
const indexRoute = require("./routes/index.route");

dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;
app.use("/", rateLimiter, indexRoute);

app.listen(port, () => {
  console.log(`app running in ${port}`);
});
