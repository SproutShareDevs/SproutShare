const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: String, 
    user_ID: String,
	rated_by_users: [String]
});

module.exports =  mongoose.model("Comment", commentSchema);