const express = require('express');
const router = express.Router();
const loginServices = require('../services/loginServices');
const sproutShareUserServices = require('../services/sproutShareUserServices');

/*
	use the following in a console window and store output in .env as ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET 
	node
	require('crypto').randomBytes(64).toString('hex') 
	require('crypto').randomBytes(64).toString('hex') 
*/

/**
 * TO-DO
 * Set expiration for jwt access and ref tokens
 * remove saving of access token (review jwt specs)
*/

// Handling login logic
router.post("/", async(req, res) => {
	try {

		// Authenticate The User 
		const user = await loginServices.authenticateUser(req.body.username);
		if(!user) return res.status(400).send(`User with username ${req.body.username} not found`);
		
		//Authenticate Password
		const isPasswordCorrect = await loginServices.verifyUserPassword(req.body.password, user.password);
		if(!isPasswordCorrect) return res.status(401).send('Invalid Password');
		
		// Create access token and refresh token for user
		const userAccessToken = loginServices.createUserAccessToken(user.user_key);
		//const userRefreshToken = loginServices.createUserRefreshToken(user.user_key)
		
		// update the user with new access token
		const updatedUser = await sproutShareUserServices.updateAccessToken(user.user_key, userAccessToken);
		//updatedUser = await sproutShareUserServices.updateRefreshToken(user.user_key, userRefreshToken);

		if(updatedUser) return res.status(200).json({
				userAccessToken: userAccessToken,
				//userRefreshToken: userRefreshToken
			});
	
	} catch (error) {
		console.error(error);
		res.send(JSON.stringify(error.message));
	}
});

module.exports = router;