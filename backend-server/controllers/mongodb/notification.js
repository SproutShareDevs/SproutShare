const express = require('express');
const router = express.Router();
const Notifications = require('../../models/Notification');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   const notifications = await Notifications.find({});
   res.send(notifications);
})

/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
router.get('/:id', async(req, res) => {
   const notification = await Notifications.findById(req.params.id);
   res.send(notification);
}) 

/** 
 * Searches the communityposts collection for strings matching the regex query string in...
 * user_plant
 * notification_title
 * notification_body
 * Can return multiple records as a collection
 */
router.get('/search', async(req, res) =>{
   const notifications = await Notifications.find()
   .or(
         [
            {user_plant: {$regex:req.query.string}}, 
            {notification_title: {$regex:req.query.string}},
            {notification_body: {$regex:req.query.string}}
         ]
   );
   res.send(notifications);
})

/** Handler for creating a community post */
router.post('/store', async(req,res) =>{
   const notification = await Notifications.create(req.body);
   res.send(notification);
})
/**
 *  Updates a document in the communityposts collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   const notification = await Notifications.findByIdAndUpdate(req.params.id, {...req.body});
   res.send(notification);
})

/**
 * Deletes a document in the communityposts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to notifications page
 */
router.delete('/delete/:id', async(req, res)=>{
   const notification = await Notifications.findByIdAndDelete(req.params.id);  
   res.send(notification);
})

module.exports = router;