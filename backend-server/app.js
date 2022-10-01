/** npm packages */
const express = require('express');
const bodyParser = require('body-parser')test
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');

/** seed db */
const seedDB = require("./db/seed.js");

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

/* postgres */
const plantController = require('./controllers/postgres/plants');
const userPlantsController = require('./controllers/postgres/userPlants');
const gardensController = require('./controllers/postgres/gardens');

app.use('/plants', plantController);
app.use('/userPlants', userPlantsController);
app.use('/gardens/', gardensController);

/* mongodb */
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
const ejsPlantController = require('./controllers/ejs-testing/postgres/plants');
const ejsUserPlantController = require('./controllers/ejs-testing/postgres/userPlants');
const ejsGardensController = require('./controllers/ejs-testing/postgres/gardens');

app.use('/ejs-testing/plants', ejsPlantController);
app.use('/ejs-testing/userPlants', ejsUserPlantController);
app.use('/ejs-testing/gardens', ejsGardensController);

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


// seed database, comment out unless you want to reseed database
//seedDB();

app.listen(3000, ()=>{console.log('Listening on port 3000...')});
