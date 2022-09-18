/** 
 * Searches the notifications collection for strings matching the regex query string in...
 * user_plant
 * notification_title
 * notificatino_body
 * Can return multiple records as a collection
 */

const Notifications = require('../../models/Notification');

module.exports = async(req, res)=>{
   const notifications = await Notifications.find()
   .or([
      {user_plant: {$regex: req.query.string}},
      {notification_title: {$regex:req.query.string}},
      {notification_body: {$regex: req.query.string}}
   ]);

   res.render('notifications', {notifications});
}