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

function createUserAccessToken(userKey){
   return jwt.sign({userKey:userKey}, process.env.ACCESS_TOKEN_SECRET);
}

function createUserRefreshToken(userKey){
   return jwt.sign({userKey:userKey}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});
}


module.exports = {
   authenticateUser,
   verifyUserPassword,
   createUserAccessToken
   //createUserRefreshToken
}