const Notifications = require('../../../models/Notification');

module.exports = async(req,res)=>{
   const notification = await Notifications.findByIdAndUpdate(req.params.id, {...req.body});
   console.log(notification);
   res.redirect('/ejs-testing/notifications');
}