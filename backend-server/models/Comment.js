const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: String, 
    user_ID: String
});

module.exports =  mongoose.model("Comment", commentSchema);