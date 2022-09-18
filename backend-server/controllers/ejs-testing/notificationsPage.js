/** 
 * Route handling for the notifications page 
 * Gets all notifications from the Notificaitons document
 * renders them with ejs 
 * 
 */

const Notifications = require('../../models/Notification');
module.exports = async(req, res) => {
   const notifications = await Notifications.find({});
   res.render('notifications', {notifications});
}