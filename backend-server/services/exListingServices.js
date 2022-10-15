const exListingDatabase = require('../database/exListingDatabase');

async function getAllListings() {
   try {
      const allListings = await exListingDatabase.getAllListings();
      return allListings;
   } catch (error) {
      console.error(error);
   }
}

async function getListingById(listingId){
   try {
      const singleListing = await exListingDatabase.getListingById(listingId);
      return singleListing;
   } catch (error) {
      console.error(error);
   }
}

async function getListingsByQuery(query){
   try {
      const listings = await exListingDatabase.getListingsByQuery(query);
      return listings;
   } catch (error) {
      console.error(error);
   }
}

async function storeListing(listing){
   try {
      await exListingDatabase.storeListing(listing);
   } catch (error) {
      console.error(error);
   }
}

async function updateListing(listingId, listingBody){
   try {
      await exListingDatabase.updateListing(listingId, listingBody); 
   } catch (error) {
      console.error(error);
   }
}

async function deleteListing(listingId){
   try {
      await exListingDatabase.deleteListing(listingId);
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