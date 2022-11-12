const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeListingSchema = new Schema({
   // ex_post_ID will be automatically generated when a document is added to the exchangeListing collection
   user_key: String,
   ex_plant: String,
   ex_post_date: {type: Date, default: new Date()},
   ex_post_title: String,
   ex_post_body: String
});

const ExchangeListing = mongoose.model('ExchangeListing', ExchangeListingSchema);

module.exports = ExchangeListing;