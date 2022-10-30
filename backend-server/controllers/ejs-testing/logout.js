const express = require('express');
const router = express.Router();
const sproutShareUserServices = require('../../services/sproutShareUserServices');

router.post("/", async(req, res) => {
    try {
        console.log(req.body);
        const username = req.body.username;
        console.log(username);
        const user = await sproutShareUserServices.getUserByUsername(username);
        console.log(user);
        const deletedRefToken = await sproutShareUserServices.deleteRefreshToken(user.user_key);
        if(deletedRefToken)
            res.json({status:'ok'});
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify(error.message));
    }
});

module.exports = router;