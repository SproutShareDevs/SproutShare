const express = require('express');
const router = express.Router();
const notificationServices = require('../../services/notificationServices');

router.get('/', async(req, res) => {
   try {
      const notifications = await notificationServices.getAllNotifications();
      res.render('notifications', {notifications});
   } catch (error) {
      console.error(error);
   }
})

router.get('/id', async(req, res) => {
   const notificationId = req.query.id;
   try {
      const notifications = [await notificationServices.getNotificationById(notificationId)];
      res.render('notifications', {notifications});
   } catch (error) {
      console.error(error);   
   }
}) 

router.get('/search', async(req, res) =>{
   
   const query = {$regex:req.query.string};
   try {
      const notifications = await notificationServices.getNotificationByQuery(query);
      res.render('notifications', {notifications});
   } catch (error) {
      console.error(error);
   }
})

router.post('/store', async(req,res) =>{
   const notification = req.body;
   try {
      await notificationServices.storeNotification(notification);
      res.redirect('/ejs-testing/notifications');
   } catch (error) {
      console.error(error);
   }
})

router.put('/update/:id', async(req,res)=>{
   const notificationBody = req.body;
   const notificationId = req.params.id;
   try {
      await notificationServices.updateNotification(notificationId, notificationBody);
      return res.status(200).send(`${notificationId} Successfully Updated`);
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/notifications');
})

router.delete('/delete/:id', async(req, res)=>{
   const notificationId = req.params.id;
   try {
      await notificationServices.deleteNotification(notificationId);
      res.redirect('/ejs-testing/notifications');
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/notifications');
})
module.exports = router;