const loginDatabase = require('../database/loginDatabase');
const sproutShareUserServices = require('../services/sproutShareUserServices');
const bcrypt = require('bcrypt');



async function verifyUserPassword(savedPassword, password){
   // we can do other authentication here
   const result = await bcrypt.compare(password, savedPassword); 
   if(result) return true;
   return false;
}


module.exports = {
   verifyUserPassword
   //storeJWT,
   //getJWT
}