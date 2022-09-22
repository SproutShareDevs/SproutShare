const express = require('express');
const router = express.Router();
const Notifications = require('../../../models/Notification');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   const notifications = await Notifications.find({});
   res.render('notifications', {notifications});
})

/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
router.get('/id', async(req, res) => {
   const notification = [await Notifications.findById(req.query.id)];
   res.render('notifications', {notification});
}) 

/** 
 * Searches the communityposts collection for strings matching the regex query string in...
 * comm_post_title
 * comm_post_body
 * Can return multiple records as a collection
 */
router.get('/search', async(req, res) =>{
    const notifications = await Notifications.find()
    .or(
          [
             {comm_post_title: {$regex:req.query.string}}, 
             {comm_post_body: {$regex:req.query.string}}
          ]
    );
    res.render('notifications', {notifications});
})

/** Handler for creating a community post */
router.post('/store', (req,res) =>{
   Notifications.create(req.body, (error, communityPost)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.redirect('/ejs-testing/notifications');
})
/**
 *  Updates a document in the communityposts collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   const notification = await Notifications.findByIdAndUpdate(req.params.id, {...req.body});
   res.redirect('/ejs-testing/notifications');
})

/**
 * Deletes a document in the communityposts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to notifications page
 */
router.delete('/delete/:id', async(req, res)=>{
    const notification = await Notifications.findByIdAndDelete(req.params.id);  
    res.redirect('/ejs-testing/notifications');
})

module.exports = router;