const express = require('express');
const router = express.Router();
const sproutShareUserServices = require('../services/sproutShareUserServices');

router.post("/", async(req, res) => {
    try {
        const username = req.body.username;
        const user = await sproutShareUserServices.getUserByUsername(username);
        //const deletedRefToken = await sproutShareUserServices.deleteRefreshToken(user.user_key);
        const deletedAccessToken = await sproutShareUserServices.deleteAccessToken(user.user_key);
        if(/*deletedRefToken && */deletedAccessToken)
            res.sendStatus(200);
            
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify(error.message));
    }
});

module.exports = router;