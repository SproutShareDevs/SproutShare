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

/** production */

const homePageController = require('./controllers/homePage');
const commPostController = require('./controllers/mongodb/commPost');
const exchangeListingController = require('./controllers/mongodb/exListing');
const notificationsController = require('./controllers/mongodb/notification');
const forumPostController = require('./controllers/mongodb/forumPost');

app.get('/', homePageController);
app.use('/communityPosts', commPostController);
app.use('/exchangeListings', exchangeListingController);
app.use('/notifications', notificationsController);
app.use('/forumPosts', forumPostController);


/** ejs */

/** postgres */
const plantTypeController = require('./controllers/ejs-testing/postgres/plantTypeRoute');

app.use('/ejs-testing/plantTypes', plantTypeController);

/** mongodb */
const ejsTestPageController = require('./controllers/ejs-testing/testPageController');
const ejsCommPostController = require('./controllers/ejs-testing/mongodb/commPost');
const ejsExchangeListingController = require('./controllers/ejs-testing/mongodb/exListing');
const ejsNotificationController = require('./controllers/ejs-testing/mongodb/notification');
const ejsForumPostController = require('./controllers/ejs-testing/mongodb/forumPost');

app.get('/ejs-testing', ejsTestPageController);
app.use('/ejs-testing/communityPosts', ejsCommPostController);
app.use('/ejs-testing/exchangeListings', ejsExchangeListingController);
app.use('/ejs-testing/notifications', ejsNotificationController);
app.use('/ejs-testing/forumPosts', ejsForumPostController);

app.listen(3000, ()=>{console.log('Listening on port 3000...')});