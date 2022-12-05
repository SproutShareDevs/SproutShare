const express = require('express');
const router = express.Router();
const sproutShareUserServices = require('../services/sproutShareUserServices');

router.get('/allUsers', async(req, res)=>{
   try {
      const allUsers = await sproutShareUserServices.getAllUsers();
      res.send(allUsers);
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
})

router.get('/:token', async(req,res)=>{
   try {
      const user = await sproutShareUserServices.getUserByToken(req.params.token);
      res.send(user);
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
})

module.exports = router;