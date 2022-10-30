// placeholder file
// all jwt related processes will move here
const sproutShareUserServices = require('./sproutShareUserServices');
const jwt = require('jsonwebtoken');


/**
 * Expects the following Header in the request
 * Authorization: <type> <credentials>
 * i.e.
 * Authorization: Bearer refreshToken
 */
function authorizeUser(){

}

/**
 * 
 */

async function getNewRefreshToken(){
   jwt
}