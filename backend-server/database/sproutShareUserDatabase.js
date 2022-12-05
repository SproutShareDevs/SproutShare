const pool = require('../models/postgresPool');

/**
 * Get all users
 */
async function getAllUsers(){
   try {
      const allUsers = await pool.query('SELECT * FROM sproutshareuser');
      return allUsers.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get user by key
 */
async function getUserByKey(userKey){
   try {
      const user = await pool.query('SELECT * FROM sproutshareuser WHERE user_key = $1',[userKey]);
      return user.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get user by query
 */
async function getUserByQuery(query){
   try {
      //const users = await sproutShareUserDatabase.getUserByQuery(query);
      //return users;
      return JSON.stringify("Sorry, not implemented yet!");
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get user by token
 */
async function getUserByToken(accessToken){
   try {
      const user = await pool.query('SELECT * FROM sproutshareuser WHERE accesstoken = $1',[accessToken]);
      return user.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get user by username
 */
async function getUserByUsername(username){
   try {
      const user = await pool.query('SELECT * FROM sproutshareuser WHERE username = $1', [username]);
      return user.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get users by zip code
 */
async function getUserByZipCode(zipCode){
   try {
      const user = await pool.query('SELECT * FROM sproutshareuser WHERE zip_code = $1',[zipCode]);
      return user.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get nearby users by distance
 */

async function getUserByCoords(userLat, userLong, radius){
   try {
      // Old version; inaccurate, do not use
	  // const user = await pool.query('SELECT * FROM sproutshareuser WHERE sqrt( (user_lat-$1)^2 + (user_long-$2)^2 ) <= $3',[userLat, userLong, radius]);
	  // This distance formula is the great-circle distance. The acos function returns the angle between the two points, which needs to be multiplied by 
	  // the radius of the circle to yield distance. The radius of the Earth is taken from this page, https://en.wikipedia.org/wiki/Great-circle_distance.
	  const user = await pool.query('SELECT * FROM sproutshareuser WHERE acos( sin( radians(user_lat) )*sin( radians($1) ) + cos( radians(user_lat) )*cos( radians($1) )*cos( radians(user_long)-radians($2) ) )*6371.009 <= $3',[userLat, userLong, radius]);
      return user.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getUserAccessTokenByKey(userKey){
   try {
      const userAccessToken = await pool.query('SELECT accesstoken FROM sproutshareuser WHERE user_key = $1', [userKey]);
      return userAccessToken.rows[0].accesstoken;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Store User 
 */
async function storeUser(user){
   try {
      const storedUser = await 
      pool.query('INSERT INTO sproutshareuser(first_name, last_name, email_address, lang, zip_code, username, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
         user.first_name, 
         user.last_name, 
         user.email_address, 
         user.lang, 
         user.zip_code, 
         user.username, 
         user.password
      ]);
      return storedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update user by key
 */
async function updateUser(userKey, userBody){
   try {
      const updatedUser = await pool.query('UPDATE sproutshareuser SET first_name = $1, last_name = $2, email_address = $3, lang = $4, zip_code = $5, username = $6, password = $7 WHERE user_key = $8 RETURNING *', 
      [
         userBody.first_name, 
         userBody.last_name, 
         userBody.email_address, 
         userBody.lang, 
         userBody.zip_code, 
         userBody.username, 
         userBody.password,
         userKey
      ]);
      return updatedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update user password
 */
async function updateUserPassword(userKey, newPassword)
{
   try {
      const updatedPassword = await pool.query('UPDATE sproutshareuser SET password = $1 WHERE user_key = $2 RETURNING password',
      [
         newPassword, 
         userKey
      ]);
      return updatedPassword.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}
/**
 * Update access token by user key
 */
async function updateAccessToken(userKey, accessToken){
   try {
      const updatedUser = await pool.query('UPDATE sproutshareuser SET accesstoken = $2 WHERE user_key = $1 RETURNING *', [userKey, accessToken]);
      return updatedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update refresh token by user key
 */
 async function updateRefreshToken(userKey, refreshToken){
   try {
      const updatedUser = await pool.query('UPDATE sproutshareuser SET refreshtoken = $2 WHERE user_key = $1 RETURNING *', [userKey, refreshToken]);
      return updatedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update access token by user key
 */
 async function deleteAccessToken(userKey){
   try {
      const updatedUser = await pool.query('UPDATE sproutshareuser SET accesstoken = NULL WHERE user_key = $1 RETURNING *', [userKey]);
      return updatedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update refresh token by user key
 */
 async function deleteRefreshToken(userKey){
   try {
      const updatedUser = await pool.query('UPDATE sproutshareuser SET refreshtoken = NULL WHERE user_key = $1 RETURNING *', [userKey]);
      return updatedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Delete user by key
 */
async function deleteUser(userKey){
   try {
      const deletedUser = await pool.query('DELETE FROM sproutshareuser WHERE user_key = $1', [userKey]);
      return deletedUser.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllUsers,
   getUserByKey,
   getUserByZipCode,
   getUserByCoords,
   getUserByQuery,
   getUserByToken,
   getUserByUsername,
   getUserAccessTokenByKey,
   storeUser,
   updateUser,
   updateUserPassword,
   updateAccessToken,
   updateRefreshToken,
   deleteAccessToken,
   deleteRefreshToken,
   deleteUser
};