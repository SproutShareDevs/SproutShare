const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

//Login Form
router.get("/", async(req, res) => {
	res.render('login');
});

// Handling login logic
router.post("/", async(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	
	try	{
		const getUser = await pool.query("SELECT * FROM sproutshareuser WHERE username = $1", [username]);
		// If the query returned a user, check if their password matches
		if(getUser.rows[0]) {
			if(getUser.rows[0].password === password) {
				// Send back access token info here
				// Push access token to database
				// Consider adding refresh tokens
				res.send('Logged in');
			} else {
				res.send('Invalid password');
			}
			// else say the user wasn't found
		} else {
			res.send('User not found');
		}
	} catch (error) {
		res.send(JSON.stringify(error.message));
	}
});

module.exports = router;