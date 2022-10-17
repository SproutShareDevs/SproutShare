const express = require('express');
const router = express.Router();
const loginServices = require('../services/loginServices');
const sproutShareUserServices = require('../services/sproutShareUserServices');
const jwt = require('jsonwebtoken');



// Handling login logic
router.post("/", async(req, res) => {
	try {

		// Authenticate The User
		const user = await sproutShareUserServices.getUserByUsername(req.body.username);

		if(!user) return res.status(400).send(`User with username ${req.body.username} not found`);
		
		const isPasswordCorrect = await loginServices.verifyUserPassword(user.password, req.body.password);
		
		if(!isPasswordCorrect) return res.status(401).send('Invalid Password');
		
		// Create JWT 
		/*
		 * used the following in a console window and stored results in .env as ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET 
		 * > node
		 * > require('crypto').randomBytes(64).toString('hex') 'c2048d16629b4abdb94b6dd88a4906be51bd0c581046df41f8442faee95b9c8d3a796b6b51fd7e6e8b2f913e5184341deec4afb759001cf92644d7ac8f8506d7'
		 * > require('crypto').randomBytes(64).toString('hex') '9a7d686ef0c801a23e9ab5c30b2220c2f76ea8a872e87ef7fce704d68e033a19b68d5121c4891f87ebd0a1c12d9a84b2a0afe5a70085ca28aca00092b905551b'
		 */
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
		console.log(accessToken);
		const updatedUser = await sproutShareUserServices.updateAccessToken(user.user_key, accessToken);
		console.log(updatedUser);
		if(updatedUser) return res.status(200).json({accessToken: accessToken});
		//res.json({accessToken: accessToken});

	} catch (error) {
		console.error(error);
		res.send(JSON.stringify(error.message));
	}
});

module.exports = router;