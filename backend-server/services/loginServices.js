const loginDatabase = require('../database/loginDatabase');
const sproutShareUserServices = require('../services/sproutShareUserServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticateUser(username){
   // verify user exists in DB
   const user = await sproutShareUserServices.getUserByUsername(username);
   if(!user) return false;

   return user;

}

async function verifyUserPassword(password, savedPassword){
   // we can do other authentication here
   const result = await bcrypt.compare(password, savedPassword); 
   if(result) return true;
   return false;
}

function createUserAccessToken(userKey, accessToken){
   return jwt.sign(userKey, accessToken);
}



module.exports = {
   authenticateUser,
   verifyUserPassword,
   createUserAccessToken
}