const express = require('express');
const router = express.Router();
const loginServices = require('../services/loginServices');
const sproutShareUserServices = require('../services/sproutShareUserServices');
const jwt = require('jsonwebtoken');

router.post('/', async(req,res)=>{
	const user = req.body;
	try {
	   const newUser = await sproutShareUserServices.storeUser(req.body);
		if(!newUser) return res.sendStatus(500); // need to define more error cases
		
	   res.sendStatus(201);
	} catch (error) {
       console.log(error);
	   res.send(JSON.stringify(error.message));
	}
 });

 module.exports = router;