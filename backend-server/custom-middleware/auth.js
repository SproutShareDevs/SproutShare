// placeholder file
// all jwt related processes will move here
const jwt = require('jsonwebtoken');



/**
 * Expects the following Header in the request
 * Authorization: <type> <credentials>
 * i.e.
 * Authorization: Bearer refreshToken
 */
function authorizeUser(req, res, next){
   
   // get token
   const authHeader = req.headers['authorization'];
   // Splits on space in 'Bearer refreshToken' and saves the refresh token
   // If authHeader !== undefined
   const refreshToken = authHeader && authHeader.split(' ')[1];
   
   // verify correct user
   console.log("1auth:", refreshToken);
   if(refreshToken == null) return res.sendStatus(401); //user unauthorized
   
   // Verify the refreshToken and return either a 403 or the user key to the calling controller
   const userKey = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
   if(!userKey || userKey == null) return res.sendStatus(403);
   req.body.user_key = userKey;
   next();
}

/**
 * 
 */

async function getNewRefreshToken(){

}

module.exports = {
   authorizeUser
};
