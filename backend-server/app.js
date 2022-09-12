
/** npm packages */
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

/** database connection(s) */
mongoose.connect('mongodb://localhost/SproutShareNoSQL', {useNewUrlParser: true});

/** npm package middleware */
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

/** custom middleware */

/** controllers */
// page view controllers
const homePageController = require('./controllers/homePage');
const commPostPageController = require('./controllers/commPostPage');
const exchangeListPageController = require('./controllers/exchangeListPage');
const notificationsPageController = require('./controllers/notificationsPage');
const testHomePageController = require('./controllers/testPageController');

// create view controllers
const storeCommPostController = require('./controllers/storeCommPost');
const storeExPostController = require('./controllers/storeExPost');
const storeNotificationsController = require('./controllers/storeNotification');
/** route handling */

// render pages
app.get('/', homePageController);
app.get('/test', testHomePageController);
app.get('/communityPosts', commPostPageController);
app.get('/exchangeListings', exchangeListPageController);
app.get('/notifications', notificationsPageController);

// get by id
app.get('/communityPosts/:id', commPostPageController);
app.get('/exchangeListings/:id', exchangeListPageController);
app.get('/notifications/:id', notificationsPageController);

// storing data
app.post('/communityPosts/store', storeCommPostController);
app.post('/exchangeListings/store', storeExPostController);
app.post('/notificaitons/store', storeNotificationsController);

// updating data
app.put('/communityPosts/store');
app.put('/exchangeListings/store');
app.put('notificaitons/store');

// deleting data
app.delete('/communityPosts/store');
app.delete('/exchangeListings/store');
app.delete('notificaitons/store');

app.listen(3000, ()=>{console.log('Listening on port 3000...')});