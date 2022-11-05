const express = require('express');
const router = express.Router();
const sproutShareUserServices = require('../../services/sproutShareUserServices');

/**
 * Get all users
 */
router.get('/', async(req, res)=>{
   try {
      const users = await sproutShareUserServices.getAllUsers();
      res.render('sproutShareUsers', {users});
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

/**
 * Get user by key
 */
router.get('/key', async(req, res)=>{
   try {
      const users = await [sproutShareUserServices.getUserByKey(req.query.key)];
      res.render('sproutShareUsers', {users});
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

/**
 * Get user by query
 */
router.get('/search', async(req,res)=>{
   try {
      const users = await sproutShareUserServices.getUserByQuery(req.query.string);
      res.render('sproutShareUsers', {users});
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

/**
 * Store User 
 */
router.post('/store', async(req, res)=>{
   try {
      await sproutShareUserServices.storeUser(req.body);
      res.redirect('/ejs-testing/sproutShareUsers');
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})


/**
 * Update user by key
 */
router.put('/update/:key', async(req, res)=>{
   try {
      const updatedUser = await sproutShareUserServices.updateUser(req.params.key, req.body);
      res.send(updatedUser);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

/**
 * Delete user by key
 */
router.delete('/delete/:key', async(req, res)=>{
   try {
      await sproutShareUserServices.deleteUser(req.params.key);
      res.redirect('/ejs-testing/sproutShareUsers');
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

module.exports = router;