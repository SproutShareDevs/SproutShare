// placeholder file
// all user verification related processes will move here
const jwt = require('jsonwebtoken');


/**
 * Expects the following Header in the request
 * Authorization: <type> <credentials>
 * i.e.
 * Authorization: Bearer accessToken
 */
function authorizeUser(req, res, next){
   
   // get token
   const authHeader = req.headers['authorization'];

   // Splits on space in 'Bearer refreshToken' and saves the access token
   // If authHeader !== undefined
   const accessToken = authHeader && authHeader.split(' ')[1];

   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userKey)=>{
      
      if(err) {
         console.error(err); 
         return res.sendStatus(403);
      }

      req.body.user_key = userKey.userKey;   
      next();
   });
   
}

/**
 * 
 */

async function checkRefreshToken(userKey){

}

module.exports = {
   authorizeUser
};