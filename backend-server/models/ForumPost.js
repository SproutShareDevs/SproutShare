const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumPostSchema = new Schema({
   // forum_post_id will be automatically generated when a document is added to the Notifications collection
   user_ID: String,
   user_plant: String,
   forum_post_title: String,
   forum_post_date: {type: Date, default: new Date()},
   forum_post_body: String
})

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);

module.exports = ForumPost;