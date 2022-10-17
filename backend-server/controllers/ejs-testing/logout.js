const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");

router.get("/", (req, res, next) => {
    req.logout(function(err) {
        if(err) { return next(err); }
        res.redirect('/ejs-testing');
    });
});

module.exports = router;