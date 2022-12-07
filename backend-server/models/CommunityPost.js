const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunityPostSchema = new Schema({
   // comm_post_ID will be automatically generated when a document is added to the communityPosts collection
   user_ID: String,
   comm_post_date: {type: Date, default: new Date()},
   comm_post_title: String,
   comm_post_body: String,
   comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment" // name of the model
		}
	]
});

const CommunityPost = mongoose.model('CommunityPost', CommunityPostSchema);

module.exports = CommunityPost;