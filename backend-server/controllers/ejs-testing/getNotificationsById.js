const Notifications = require('../../models/Notification');

module.exports = async (req, res)=>{
   const notifications = [await Notifications.findById(req.query.id)];
   res.render('notifications', {notifications});
}