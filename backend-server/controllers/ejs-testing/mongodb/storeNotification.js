/**
 * Processes the input of one notification record and 
 * stores it in the notifications collection
 * Prints an error to the console if an error 
 * is encountered
 */

const Notification = require('../../../models/Notification.js');

module.exports = (req, res)=>{
   Notification.create(req.body, (error, notification)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.redirect('/notifications');
}