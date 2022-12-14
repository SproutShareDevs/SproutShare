/** npm packages */
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
console.log(require('dotenv').config());
const auth = require('./custom-middleware/authMiddleware');
const processes = require('./processes/WateringNotificationProcess');

/** seed db */
const seedDB = require("./db/seed.js");

/** database connection(s) */
if(process.argv[2] == "local") {
    mongoose.connect('mongodb://localhost/SproutShareNoSQL', {useNewUrlParser: true});
} else {
    mongoose.connect('mongodb://mongo:27017', {useNewUrlParser: true});
}

/** npm package middleware */
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(cors());

/** Processes */
//processes.start(); // starts watering notification process on timer

/** production */

const weatherController = require('./controllers/weather');
app.use('/weather', weatherController);

const loginController = require('./controllers/login');
const logoutControler = require('./controllers/logout');
const registerController = require('./controllers/register');
//const authController = require('./controllers/auth');

app.use('/login', loginController);
app.use('/logout', logoutControler);
app.use('/register', registerController);
//app.use('/auth', authController);

/* postgres */
const plantController = require('./controllers/plants');
const userPlantsController = require('./controllers/userPlants');
const gardensController = require('./controllers/gardens');
const userController = require("./controllers/sproutShareUser");

app.use('/plants', plantController);
app.use('/userPlants', userPlantsController);
app.use('/gardens', gardensController);
app.use('/user', userController);

/* mongodb */
const homePageController = require('./controllers/homePage');
const commPostController = require('./controllers/commPost');
const exchangeListingController = require('./controllers/exListing');
const notificationsController = require('./controllers/notification');
const forumPostController = require('./controllers/forumPost');

app.get('/', homePageController);
app.use('/communityPosts', commPostController);
app.use('/exchangeListings', exchangeListingController);
app.use('/notifications', notificationsController);
app.use('/forumPosts', forumPostController);


/** ejs */
const ejsTestPageController = require('./controllers/ejs-testing/testPageController');
app.get('/ejs-testing', ejsTestPageController);

const ejsLoginController = require('./controllers/ejs-testing/login');
app.use('/ejs-testing/login', ejsLoginController);

const ejsLogoutController = require('./controllers/ejs-testing/logout');
app.use('/ejs-testing/logout', ejsLogoutController);

const ejsRegisterController = require('./controllers/ejs-testing/register');
app.use('/ejs-testing/register', ejsRegisterController);

const ejsWeatherController = require('./controllers/ejs-testing/weather');
app.use('/ejs-testing/weather', ejsWeatherController);

/** postgres */
const ejsPlantController = require('./controllers/ejs-testing/plants');
const ejsUserPlantController = require('./controllers/ejs-testing/userPlants');
const ejsGardensController = require('./controllers/ejs-testing/gardens');
const ejsSproutShareUserController = require('./controllers/ejs-testing/sproutShareUsers');
app.use('/ejs-testing/plants', ejsPlantController);
app.use('/ejs-testing/userPlants', ejsUserPlantController);
app.use('/ejs-testing/gardens', ejsGardensController);
app.use('/ejs-testing/sproutShareUsers', ejsSproutShareUserController);

/** mongodb */
const ejsCommPostController = require('./controllers/ejs-testing/commPost');
const ejsExchangeListingController = require('./controllers/ejs-testing/exListing');
const ejsNotificationController = require('./controllers/ejs-testing/notification');
const ejsForumPostController = require('./controllers/ejs-testing/forumPost');

app.use('/ejs-testing/communityPosts', ejsCommPostController);
app.use('/ejs-testing/exchangeListings', ejsExchangeListingController);
app.use('/ejs-testing/notifications', ejsNotificationController);
app.use('/ejs-testing/forumPosts', ejsForumPostController);

app.use(auth.authorizeUser);
app.use('/userPlants', userPlantsController);

// seed database, comment out unless you want to reseed database
//seedDB();

app.listen(3000, ()=>{
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
      });
    console.log('Listening on port 3000...')
});
