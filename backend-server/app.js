
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

// store view controllers
const storeCommPostController = require('./controllers/storeCommPost');
const storeExListingController = require('./controllers/storeExListing');
const storeNotificationsController = require('./controllers/storeNotification');

// get by ID controllers
const getCommPostByIdController = require('./controllers/getCommPostById');
const getExListingByIdController = require('./controllers/getExListingById');
const getNotificationByIdController = require('./controllers/getNotificationsById.js');

// get by search string controllers
const getCommPostsByQueryController = require('./controllers/getCommPostByQuery');
const getExListingsByQueryController = require('./controllers/getExListingByQuery');
const getNotificationsByQueryController = require('./controllers/getNotificationByQuery')

// edit post controllers
const editCommPostController = require('./controllers/editCommPost');
const editExListingController = require('./controllers/editExListing');
const editNotificationController = require('./controllers/editNotification');
// delete post controllers
const delCommPostByIdController = require('./controllers/delCommPostById');
const delExListingByIdController = require('./controllers/delExListingById');
const delNotificationByIdController = require('./controllers/delNotificationById');
/** route handling */
// get pages
app.get('/', homePageController);
app.get('/test', testHomePageController);
app.get('/communityPosts', commPostPageController);
app.get('/exchangeListings', exchangeListPageController);
app.get('/notifications', notificationsPageController);

// get post by id
app.get('/communityPosts/id', getCommPostByIdController);
app.get('/exchangeListings/id', getExListingByIdController);
app.get('/notifications/id', getNotificationByIdController);

// get post(s) by regex query
app.get('/communityPosts/query', getCommPostsByQueryController);
app.get('/exchangeListings/query', getExListingsByQueryController);
app.get('/notifications/query', getNotificationsByQueryController);

// store post
app.post('/communityPosts/store', storeCommPostController);
app.post('/exchangeListings/store', storeExListingController);
app.post('/notificaitons/store', storeNotificationsController);

// update post
app.put('/communityPosts/update/:id', editCommPostController);
app.put('/exchangeListings/update/:id', editExListingController);
app.put('/notificaitons/update/:id', editNotificationController);

// delete post
app.delete('/communityPosts/delete/:id', delCommPostByIdController);
app.delete('/exchangeListings/delete/:id', delExListingByIdController);
app.delete('/notifications/delete/:id', delNotificationByIdController);

app.listen(3000, ()=>{console.log('Listening on port 3000...')});