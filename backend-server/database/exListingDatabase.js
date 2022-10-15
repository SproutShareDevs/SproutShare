const ExchangeListings = require('../models/ExchangeListing');

/**
 * 
 * @returns a collection of Exchange Listings JSON Objects
 */
async function getAllListings() {
   try {
      const allListings = await ExchangeListings.find({});
      return allListings;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} listingId The id of the Exchange Listing to find 
 * @returns An Exchange Listing as a JSON object
 */

async function getListingById(listingId){
   try {
      const singleListing = await ExchangeListings.findById(listingId);
      return singleListing;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of an exchange listing  
 * @returns a collection of exchange listings
 */

async function getListingsByQuery(query){
   try {
      const listings = await ExchangeListings.find()
      .or(
            [
               {ex_plant: query}, 
               {ex_post_title: query}, 
               {ex_post_body: query}
            ]
      );
      return listings;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} listing A new exchange listing to store in the mongodb collection 
 */

async function storeListing(listing){
   try {
      await ExchangeListings.create(listing);
   } catch (error) {
      console.error(error);
   }
}

async function updateListing(listingId, listingBody){
   try {
      await ExchangeListings.findByIdAndUpdate(listingId, listingBody); 
   } catch (error) {
      console.error(error);
   }
}

async function deleteListing(listingId){
   try {
      await ExchangeListings.findByIdAndDelete(listingId);
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   getAllListings,
   getListingById,
   getListingsByQuery,
   storeListing,
   updateListing,
   deleteListing
};