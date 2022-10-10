const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");

//Login Form
router.get("/", async(req, res) => {
	res.render('login');
});

// Handling login logic
router.post("/", passport.authenticate("local", {
	successRedirect: "/ejs-testing/users",
	failureRedirect: "/ejs-testing/communityPosts"
}), (req, res) => {});

module.exports = router;