const express = require('express');
const router = express.Router();
const wateringProcesses = require('../processes/WateringNotificationProcess');

/*
    Predefined values for cronArg in cronValues
    daily - runs every day at 10 am
    presentation - every minute
*/

// this route is WIP

router.put('/wateringTimer', (req, res)=>{
    
    let cronValues = new Map(
        ['daily', '0 10 */1 * *'],
        ['presentation', '*/10 * * * * *'],
        ['default', '0 10 */1 * *']
    );

    const cronArg = req.body.cronArg;

    if(cronValues.has(cronArg))
    {

    }
});

//module.exports = router;