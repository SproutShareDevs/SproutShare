// placeholder file
// all user verification related processes will move here
const jwt = require('jsonwebtoken');
const sproutShareUserServices = require('../services/sproutShareUserServices');

/**
 * Expects the following Header in the request
 * Authorization: <type> <credentials>
 * i.e.
 * Authorization: Bearer accessToken
 */
async function authorizeUser(req, res, next){
   
   // get token
   const authHeader = req.headers['authorization'];

   // Splits on space in 'Bearer refreshToken' and saves the access token
   // If authHeader !== undefined
   const accessToken = authHeader && authHeader.split(' ')[1];
   
   // get userKey from access token
   const {userKey} = jwt.decode(accessToken);

   // check validity of token
   if(!accessToken || accessToken === null || !userKey) return res.sendStatus(401);

   // check if the sent token matches what is in the db for the user
   const storedAccessToken = await sproutShareUserServices.getUserAccessTokenByKey(userKey);
   if(storedAccessToken != accessToken) return res.sendStatus(401);

   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userKey)=>{
      
      if(err) {
         console.error(err); 
         return res.sendStatus(403);
      }

      req.body.user_key = userKey.userKey;   
      next();
   });
   
}

module.exports = {
   authorizeUser
};