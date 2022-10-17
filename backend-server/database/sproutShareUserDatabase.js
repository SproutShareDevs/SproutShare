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

async function getUserByUsername(username){
   try {
      const user = await pool.query('SELECT * FROM sproutshareuser WHERE username = $1', [username]);
      return user.rows[0];
   } catch (error) {
      console.log(error);
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
   getUserByQuery,
   getUserByUsername,
   storeUser,
   updateUser,
   updateAccessToken,
   deleteUser
};