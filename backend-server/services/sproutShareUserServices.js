const sproutShareUserDatabase = require('../database/sproutShareUserDatabase');
const bcrypt = require('bcrypt');

/**
 * Get all users
 */
async function getAllUsers(){
   try {
      const allUsers = await sproutShareUserDatabase.getAllUsers();
      return allUsers;
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
      const user = await sproutShareUserDatabase.getUserByKey(userKey);
      return user;
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
      const users = await sproutShareUserDatabase.getUserByQuery(query);
      return users;
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
      const user = await sproutShareUserDatabase.getUserByUsername(username);
      return user;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Store User 
 * Also generates a hashed password for the user account
 */
async function storeUser(user){
   try {
      user.password = await encryptPassword(user.password);
      const storedUser = await sproutShareUserDatabase.storeUser(user);
      return storedUser;
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
      const updatedUser = await sproutShareUserDatabase.updateUser(userKey, userBody);
      return updatedUser;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Update access token
 */
async function updateAccessToken(userKey, accessToken){
   try {
      console.log(userKey);
      console.log(accessToken);
      const updatedUser = await sproutShareUserDatabase.updateAccessToken(userKey, accessToken);
      return updatedUser;
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
      const deletedUser = await sproutShareUserDatabase.deleteUser(userKey);
      return deletedUser;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function encryptPassword(password){
   try {
      // hash password with genSalt(10)
      const hashedPassword = await bcrypt.hash(password, 10);
      // return hashed password
      return hashedPassword;
   } catch (error) {
      
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