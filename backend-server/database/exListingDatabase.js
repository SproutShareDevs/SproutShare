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
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} listingId The id of the Exchange Listing to find 
 * @returns An Exchange Listing as a JSON object
 */

async function getListingById(listingId){
   try {
      const exListing = await ExchangeListings.findById(listingId);
      return exListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of an exchange listing  
 * @returns a collection of exchange listings
 */

async function getListingsByQuery(query){
   try {
      const exListings = await ExchangeListings.find()
      .or(
            [
               {ex_plant: query}, 
               {ex_post_title: query}, 
               {ex_post_body: query}
            ]
      );
      return exListings;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} listing A new exchange listing to store in the mongodb collection 
 */

async function storeListing(listing){
   try {
      const storedListing = await ExchangeListings.create(listing);
      return storedListing
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateListing(listingId, listingBody){
   try {
      const updatedListing = await ExchangeListings.findByIdAndUpdate(listingId, listingBody); 
      return updatedListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteListing(listingId){
   try {
      const deletedListing = await ExchangeListings.findByIdAndDelete(listingId);
      return deletedListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
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