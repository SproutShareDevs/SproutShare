const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sproutShareUserServices = require('../services/sproutShareUserServices');
const loginServices = require('../services/loginServices');

router.post('/token', async (req, res)=>{
   const token = req.body.token;
   if(token == null) return res.sendStatus(401);
   
   const storedToken = await sproutShareUserServices.getUserRefreshTokenByKey(req.body.user_key);
   
   if(!storedToken) return res.sendStatus(403);

   jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userKey) =>{
      if(err) return res.sendStatus(403);

      const accessToken = loginServices.createUserAccessToken(userKey.userKey);
      res.json({userAccessToken:accessToken});
   })
})

module.exports = router;