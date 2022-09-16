/**
 * Deletes a document in the notifications collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to notifications page
 */
const Notifications = require('../models/Notification');

module.exports = async(req,res)=>{
   const notification = await Notifications.findByIdAndDelete(req.params.id);
   console.log(notification);
   res.redirect('/notifications');
}