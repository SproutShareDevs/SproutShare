const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

router.get('/', async(req, res) => {
    res.render('register');
 });

 router.post('/', async(req,res)=>{
	const r = req.body;
	try {
	   const newUser = 
	   await pool.
	   query(
		  'INSERT INTO sproutshareuser(first_name, last_name, email_address, username, password, accessToken, lang, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
	   [r.first_name, r.last_name, r.email_address, r.username, r.password, 0, r.lang, r.zip_code]);
	   res.send(newUser.rows[0]);
	} catch (error) {
	   res.send(JSON.stringify(error.message));
	}
 });

module.exports = router;
 
 