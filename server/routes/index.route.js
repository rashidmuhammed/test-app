const express = require("express");
const route = express.Router();
const userRoute = require("../routes/user.routes");

route.use("/users", userRoute);

module.exports = route;
