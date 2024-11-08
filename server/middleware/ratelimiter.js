const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum number of requests allowed in the windowMs
  message: "Too many requests, please try again later.",
});

module.exports = limiter;
