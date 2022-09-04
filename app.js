
/**
 * Express
 */
const express = require('express');
const app = express();

/**
 * Mongoose
 */
const mongoose = require('mongoose');

app.get('/', (req,res)=>{
   res.send('Sprout Share... More Coming Soon');
});

app.listen(3000, ()=>{console.log('Listening on port 3000...')});