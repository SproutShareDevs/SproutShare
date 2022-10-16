const express = require('express');
const router = express.Router();
const notificationServices = require('../services/notificationServices');

router.get('/', async(req, res) => {
   try {
      const allNotifications = await notificationServices.getAllNotifications();
      res.send(allNotifications);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/search', async(req, res) =>{
   try {
      const notifications = await notificationServices.getNotificationByQuery({$regex:req.query.string});
      res.send(notifications);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/:id', async(req, res) => {
   try {
      const notification = await notificationServices.getNotificationById(req.params.id);
      res.send(notification);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 


router.post('/store', async(req,res) =>{
   try {
      const storedNotification = await notificationServices.storeNotification(req.body);
      res.send(storedNotification);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:id', async(req,res)=>{
   try {
      const updatedNotification = await notificationServices.updateNotification(req.params.id, req.body);
      res.send(updatedNotification);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:id', async(req, res)=>{
   try {
      const deletedNotification = await notificationServices.deleteNotification(req.params.id);
      res.send(deletedNotification);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;