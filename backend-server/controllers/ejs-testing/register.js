const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");

router.get('/', async(req, res) => {
    res.render('register');
 });

 router.post('/', (req,res) =>{
    User.register(new User({username: req.body.username, first_name: req.body.first_name, 
    last_name: req.body.last_name, email_address: req.body.email_address, lang: req.body.lang, zip_code: req.body.zip_code}), req.body.password, (err, user) => {
		if(err) {
			req.flash("error", err.message);
			res.redirect("/ejs-testing");
		} else {
			req.flash("success", "Account registered! Welcome to SproutShare, " + req.body.username + "!");
			res.redirect("/ejs-testing/users");
		}
	});
 })

module.exports = router;
 
 