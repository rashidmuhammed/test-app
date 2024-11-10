const express = require("express");
const router = express.Router();
const authenticationAPIs = require("../Controllers/UserConteroler");
const activityAPIs = require("../Controllers/ActivitieyController");

router.route("/register").post(authenticationAPIs.registerUser);
router.route("/login").post(authenticationAPIs.loginUser);
router.route("/createActivity").post(activityAPIs.createActivity);
router.route("/not-joined").get(activityAPIs.getAllActivitiesUserNotJoined);
module.exports = router;
