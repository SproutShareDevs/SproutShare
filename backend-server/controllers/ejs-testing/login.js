const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");
const pool = require('../../models/postgresPool');

//Login Form
router.get("/", async(req, res) => {
	res.render('login');
});

// Handling login logic
router.post("/", async(req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	console.log(username);
	
	try	{
		const getUser = await pool.query("SELECT * FROM sproutshareuser WHERE username = $1", [username]);
		res.send((getUser.rows));
	} catch (error) {
		res.send(JSON.stringify(error.message));
	}
});

module.exports = router;