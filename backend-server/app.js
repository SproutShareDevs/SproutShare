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

/** prod controllers */

// page view controllers
const homePageController = require('./controllers/homePage');
const commPostPageController = require('./controllers/mongodb/commPostPage');
const exchangeListPageController = require('./controllers/mongodb/exchangeListPage');
const notificationsPageController = require('./controllers/mongodb/notificationsPage');

// store view controllers
const storeCommPostController = require('./controllers/mongodb/storeCommPost');
const storeExListingController = require('./controllers/mongodb/storeExListing');
const storeNotificationsController = require('./controllers/mongodb/storeNotification');

// get by ID controllers
const getCommPostByIdController = require('./controllers/mongodb/getCommPostById');
const getExListingByIdController = require('./controllers/mongodb/getExListingById');
const getNotificationByIdController = require('./controllers/mongodb/getNotificationsById.js');

// get by search string controllers
const getCommPostsByQueryController = require('./controllers/mongodb/getCommPostByQuery');
const getExListingsByQueryController = require('./controllers/mongodb/getExListingByQuery');
const getNotificationsByQueryController = require('./controllers/mongodb/getNotificationByQuery')

// edit post controllers
const editCommPostController = require('./controllers/mongodb/editCommPost');
const editExListingController = require('./controllers/mongodb/editExListing');
const editNotificationController = require('./controllers/mongodb/editNotification');
// delete post controllers
const delCommPostByIdController = require('./controllers/mongodb/delCommPostById');
const delExListingByIdController = require('./controllers/mongodb/delExListingById');
const delNotificationByIdController = require('./controllers/mongodb/delNotificationById');

/** 
 * ejs-testing controllers 
 * 
 */

// page view controllers
const testHomePageEjsController = require('./controllers/ejs-testing/testPageController');
const commPostPageEjsController = require('./controllers/ejs-testing/mongodb/commPostPage');
const exchangeListPageEjsController = require('./controllers/ejs-testing/mongodb/exchangeListPage');
const notificationsPageEjsController = require('./controllers/ejs-testing/mongodb/notificationsPage');

// store view controllers/ejs-testing
const storeCommPostEjsController = require('./controllers/ejs-testing/mongodb/storeCommPost');
const storeExListingEjsController = require('./controllers/ejs-testing/mongodb/storeExListing');
const storeNotificationsEjsController = require('./controllers/ejs-testing/mongodb/storeNotification');

// get by ID controllers/ejs-testing
const getCommPostByIdEjsController = require('./controllers/ejs-testing/mongodb/getCommPostById');
const getExListingByIdEjsController = require('./controllers/ejs-testing/mongodb/getExListingById');
const getNotificationByIdEjsController = require('./controllers/ejs-testing/mongodb/getNotificationsById.js');

// get by search string controllers/ejs-testing
const getCommPostsByQueryEjsController = require('./controllers/ejs-testing/mongodb/getCommPostByQuery');
const getExListingsByQueryEjsController = require('./controllers/ejs-testing/mongodb/getExListingByQuery');
const getNotificationsByQueryEjsController = require('./controllers/ejs-testing/mongodb/getNotificationByQuery')

// edit post controllers/ejs-testing
const editCommPostEjsController = require('./controllers/ejs-testing/mongodb/editCommPost');
const editExListingEjsController = require('./controllers/ejs-testing/mongodb/editExListing');
const editNotificationEjsController = require('./controllers/ejs-testing/mongodb/editNotification');
// delete post controllers/ejs-testing
const delCommPostByIdEjsController = require('./controllers/ejs-testing/mongodb/delCommPostById');
const delExListingByIdEjsController = require('./controllers/ejs-testing/mongodb/delExListingById');
const delNotificationByIdEjsController = require('./controllers/ejs-testing/mongodb/delNotificationById');


/** 
 * prod route handling 
 * 
 */
// get pages
app.get('/', homePageController);
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
app.post('/notifications/store', storeNotificationsController);

// update post
app.put('/communityPosts/update/:id', editCommPostController);
app.put('/exchangeListings/update/:id', editExListingController);
app.put('/notifications/update/:id', editNotificationController);

// delete post
app.delete('/communityPosts/delete/:id', delCommPostByIdController);
app.delete('/exchangeListings/delete/:id', delExListingByIdController);
app.delete('/notifications/delete/:id', delNotificationByIdController);

/** 
 * ejs-testing route handling 
 * 
 */
// get pages
app.get('/ejs-testing', testHomePageEjsController);
app.get('/ejs-testing/communityPosts', commPostPageEjsController);
app.get('/ejs-testing/exchangeListings', exchangeListPageEjsController);
app.get('/ejs-testing/notifications', notificationsPageEjsController);

// get post by id
app.get('/ejs-testing/communityPosts/id', getCommPostByIdEjsController);
app.get('/ejs-testing/exchangeListings/id', getExListingByIdEjsController);
app.get('/ejs-testing/notifications/id', getNotificationByIdEjsController);

// get post(s) by regex query
app.get('/ejs-testing/communityPosts/query', getCommPostsByQueryEjsController);
app.get('/ejs-testing/exchangeListings/query', getExListingsByQueryEjsController);
app.get('/ejs-testing/notifications/query', getNotificationsByQueryEjsController);

// store post
app.post('/ejs-testing/communityPosts/store', storeCommPostEjsController);
app.post('/ejs-testing/exchangeListings/store', storeExListingEjsController);
app.post('/ejs-testing/notifications/store', storeNotificationsEjsController);

// update post
app.put('/ejs-testing/communityPosts/update/:id', editCommPostEjsController);
app.put('/ejs-testing/exchangeListings/update/:id', editExListingEjsController);
app.put('/ejs-testing/notifications/update/:id', editNotificationEjsController);

// delete post
app.delete('/ejs-testing/communityPosts/delete/:id', delCommPostByIdEjsController);
app.delete('/ejs-testing/exchangeListings/delete/:id', delExListingByIdEjsController);
app.delete('/ejs-testing/notifications/delete/:id', delNotificationByIdEjsController);

app.listen(3000, ()=>{console.log('Listening on port 3000...')});