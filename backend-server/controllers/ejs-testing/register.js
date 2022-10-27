const express = require('express');
const router = express.Router();
const sproutShareUserServices = require('../../services/sproutShareUserServices');

router.get('/', async(req, res) => {
    res.render('register');
 });

 router.post('/', async(req,res)=>{
	try{
		const newUser = await sproutShareUserServices.storeUser(req.body);
		res.render('register', {newUser});
	} catch (error) {
		console.error(error);
	   res.send(JSON.stringify(error.message));
	}
 });

module.exports = router;
 
 