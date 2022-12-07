const CommunityPosts = require('../models/CommunityPost');
const Comment = require("../models/Comment");


/**
 * 
 * @returns a collection of CommunityPost JSON Objects or an error as a JSON object
 */
async function getAllPosts() {
   try {
      const allPosts = await CommunityPosts.find({}).populate("comments");
      return allPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} Id The Id of the Community Post to find 
 * @returns The community post that matches the Id parameter or an error as a JSON object
 */

async function getPostById(postId) {
   try {
      const commPost = CommunityPosts.findById(postId).populate("comments");
      return commPost;

   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a community post  
 * @returns a collection of community posts or an error as a JSON object
 */

async function getPostByQuery(query) {
   try {
      const commPosts = await CommunityPosts.find()
         .or(
            [
               { comm_post_title: query },
               { comm_post_body: query }
            ]
         );
      return commPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} post A new community post to store in the mongodb collection 
 * @return The stored communityPost on a successful transaction or an error as a JSON object
 */

async function storePost(post) {
   try {
      const storedPost = await CommunityPosts.create(post);
      return storedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeComment(comment, postID) {
   try {
      console.log(comment);
      const post = await CommunityPosts.findById(postID);
      const newComment = new Comment(comment);
      post.comments.push(newComment);
      await newComment.save();
      await post.save();
      return newComment;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }


}


/**
 * 
 * @param {*} postId The id of the communityPost to update
 * @param {*} postBody The data to overwrite the communityPost with
 * @returns The updated communityPost or an error as a JSON object
 */
async function updatePost(postId, postBody) {
   try {
      const updatedCommPost = await CommunityPosts.findByIdAndUpdate(postId, postBody);
      return updatedCommPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}
/**
 * 
 * @param {*} postId The id of the Community Post to delete
 * @returns The delete Community Post or an error as a JSON object
 */
async function deletePost(postId) {
   try {
      const deletedCommPost = await CommunityPosts.findByIdAndDelete(postId);
      return deletedCommPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllPosts,
   getPostById,
   getPostByQuery,
   storePost,
   storeComment,
   updatePost,
   deletePost
};