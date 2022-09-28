const mongoose 	= require("mongoose"),
	ExchangeListings = require("../models/ExchangeListing"),
	CommunityPosts = require("../models/CommunityPost");

const MockExchangeData = [
    {
        user_ID: 'Erik',
        ex_plant: 'Tomato',
        ex_post_title: 'Superb Tomatoes',
        ex_post_body: 'Come buy my tomatoes!'
    }, 
    {
        user_ID: 'Jeremy',
        ex_plant: 'Pumpkin',
        ex_post_title: 'Pumpkins! Come get em!',
        ex_post_body: "Get spookin season ready! 10 dollars a pop, get the good ones while they're here"
    }, 
    {
        user_ID: 'Matt',
        ex_plant: 'Pea',
        ex_post_title: 'Peas that will knock your socks off',
        ex_post_body: "You've never had peas like this. Come get em while they're fresh."
    },
    {
        user_ID: 'Tom',
        ex_plant: 'Peanut',
        ex_post_title: 'Buy my Peanuts',
        ex_post_body: 'Mr. Peanut has nothing on me'
    },
    {
        user_ID: 'Shayla',
        ex_plant: 'Turnip',
        ex_post_title: 'Turnips!',
        ex_post_body: "Can't knock em if you haven't tried them! Don't be a wuss! Try some turnips!"
    }
]

const MockCommunityPosts = [
    {
        user_ID: "001",
        comm_post_title: "Question about strawberries",
        comm_post_body: "Recently, rabbits have been eating my strawberries. They're cute as can be, but also a real pain! Is there any way I can stop them without hurting them?"
    }, 
    {
        user_ID: "002",
        comm_post_title: "Cicada thread: What you need to know",
        comm_post_body: "You all knew it was coming; the cicada thread. Here are some useful resources for you for when these bugs start cropping up again."
    },
    {
        user_ID: "Erik",
        comm_post_title: "Help a newbie!",
        comm_post_body: "Boy lemme tell ya, gardening is a hard hobby to get into. Can anyone tell me why tomatoes are growing on my roof?"
    },
    {
        user_ID: "001",
        comm_post_title: "Jones' Labor Day BBQ: What are you bringing?",
        comm_post_body: "I'm bringing hotdogs with relish and pickles - made from my own cucumbers, of course! They turned out great after those tips that Cheryl gave me."
    } 
]

function seedDB() {
    console.log("Seeding database...");
    // remove all current exchange listings in database
    ExchangeListings.deleteMany({}, err => {

        if(err) {
            console.log(err);
        }
        // then, push each dummy data member into the db
        MockExchangeData.forEach((seed) => {
            ExchangeListings.create(seed, (error, exchangeListing)=>{
                if(error) {
                    console.log(error);
                } else {
                    console.log("Added exchange listing");
                }
             });
        });
    });

    CommunityPosts.deleteMany({}, err => {

        if(err) {
            console.log(err);
        }
        // then, push each dummy data member into the db
        MockCommunityPosts.forEach((seed) => {
            CommunityPosts.create(seed, (error, communityPost)=>{
                if(error) {
                    console.log(error);
                } else {
                    console.log("Added community post");
                }
             });
        });
    });
}

module.exports = seedDB;