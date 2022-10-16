const exListingDatabase = require('../database/exListingDatabase');

async function getAllListings() {
   try {
      const allListings = await exListingDatabase.getAllListings();
      return allListings;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getListingById(listingId){
   try {
      const exListing = await exListingDatabase.getListingById(listingId);
      return exListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getListingsByQuery(query){
   try {
      const exListings = await exListingDatabase.getListingsByQuery(query);
      return exListings;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeListing(listing){
   try {
      const storedListing = await exListingDatabase.storeListing(listing);
      return storedListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateListing(listingId, listingBody){
   try {
      const updatedListing = await exListingDatabase.updateListing(listingId, listingBody); 
      return updatedListing;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteListing(listingId){
   try {
      const deletedListing = await exListingDatabase.deleteListing(listingId);
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