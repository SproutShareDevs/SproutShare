/** npm packages */
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
console.log(require('dotenv').config());
//const jwt = require('jsonwebtoken');

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
const plantController = require('./controllers/plants');
const userPlantsController = require('./controllers/userPlants');
const gardensController = require('./controllers/gardens');

app.use('/plants', plantController);
app.use('/userPlants', userPlantsController);
app.use('/gardens', gardensController);

/* mongodb */
const homePageController = require('./controllers/homePage');
const commPostController = require('./controllers/commPost');
const exchangeListingController = require('./controllers/exListing');
const notificationsController = require('./controllers/notification');
const forumPostController = require('./controllers/forumPost');
const loginController = require('./controllers/ejs-testing/login.js');
const registerController = require('./controllers/ejs-testing/register');

app.get('/', homePageController);
app.use('/communityPosts', commPostController);
app.use('/exchangeListings', exchangeListingController);
app.use('/notifications', notificationsController);
app.use('/forumPosts', forumPostController);
app.use('/login', loginController);
app.use('/register', registerController);


/** ejs */

const ejsLoginController = require('./controllers/ejs-testing/login');
app.use('/ejs-testing/login', ejsLoginController);

/** postgres */
const ejsPlantController = require('./controllers/ejs-testing/plants');
const ejsUserPlantController = require('./controllers/ejs-testing/userPlants');
const ejsGardensController = require('./controllers/ejs-testing/gardens');
const ejsSproutShareUserController = require('./controllers/ejs-testing/postgres/sproutShareUsers');
app.use('/ejs-testing/plants', ejsPlantController);
app.use('/ejs-testing/userPlants', ejsUserPlantController);
app.use('/ejs-testing/gardens', ejsGardensController);
app.use('/ejs-testing/sproutShareUsers', ejsSproutShareUserController);

/** mongodb */
const ejsTestPageController = require('./controllers/ejs-testing/testPageController');
const ejsCommPostController = require('./controllers/ejs-testing/commPost');
const ejsExchangeListingController = require('./controllers/ejs-testing/exListing');
const ejsNotificationController = require('./controllers/ejs-testing/notification');
const ejsForumPostController = require('./controllers/ejs-testing/forumPost');

app.get('/ejs-testing', ejsTestPageController);
app.use('/ejs-testing/communityPosts', ejsCommPostController);
app.use('/ejs-testing/exchangeListings', ejsExchangeListingController);
app.use('/ejs-testing/notifications', ejsNotificationController);
app.use('/ejs-testing/forumPosts', ejsForumPostController);

// seed database, comment out unless you want to reseed database
//seedDB();

app.listen(3000, ()=>{console.log('Listening on port 3000...')});
