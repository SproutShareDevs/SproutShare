const CronJob = require('cron').CronJob;
const notificationServices = require('../services/notificationServices');
const sproutShareUserServices = require('../services/sproutShareUserServices');

// everyday at 10 am -> '0 10 */1 * *'
// every minute      -> */1 * * * *
// every second      -> */10 * * * * * 

// this runs for all users in the sproutshareusers table.  Not Ideal.
// I had to update all the users access tokens to get this to work properly
// make sure to run 'npm i' to install npm-cron 
const wateringNotificationJob = new CronJob('*/10 * * * * *', async function(){
    
    const allUsers = await sproutShareUserServices.getAllUsers();
    allUsers.forEach(async (user) => {
        await notificationServices.getNotificationByToken(user.accesstoken);
    })
});

module.exports = wateringNotificationJob;

