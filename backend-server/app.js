/** npm packages */
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');

/** database connection(s) */
mongoose.connect('mongodb://localhost/SproutShareNoSQL', {useNewUrlParser: true});
//const pool = require('./models/postgresPool');

/** npm package middleware */
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(cors());

/** custom middleware */

/** prod postgres controllers */

/** prod mongodb controllers */

const homePageController = require('./controllers/homePage');
const commPostController = require('./controllers/mongodb/commPost');
const exchangeListingController = require('./controllers/mongodb/exListing');
const notificationsController = require('./controllers/mongodb/notification');
const forumPostController = require('./controllers/mongodb/forumPost');

/** postgres ejs-testing controllers  */
const plantTypeController = require('./controllers/ejs-testing/postgres/plantTypeRoute');

/** mongodb ejs-testing controllers */
const ejsTestPageController = require('./controllers/ejs-testing/testPageController');
const ejsCommPostController = require('./controllers/ejs-testing/mongodb/commPost');
const ejsExchangeListingController = require('./controllers/ejs-testing/mongodb/exListing');
const ejsNotificationController = require('./controllers/ejs-testing/mongodb/notification');
const ejsForumPostController = require('./controllers/ejs-testing/mongodb/forumPost');

/** postgres prod route handling */

/** mongodb prod route handling */
app.get('/', homePageController);
app.use('/communityPosts', commPostController);
app.use('/exchangeListings', exchangeListingController);
app.use('/notifications', notificationsController);
app.use('/forumPosts', forumPostController);

/** postgres ejs-testing route handling */
app.use('/ejs-testing/plantTypes', plantTypeController);

/** mongodb ejs-testing route handling */
app.get('/ejs-testing', ejsTestPageController);
app.use('/ejs-testing/communityPosts', ejsCommPostController);
app.use('/ejs-testing/exchangeListings', ejsExchangeListingController);
app.use('/ejs-testing/notifications', ejsNotificationController);
app.use('/ejs-testing/forumPosts', ejsForumPostController);

app.listen(3000, ()=>{console.log('Listening on port 3000...')});