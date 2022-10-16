const ForumPosts = require('../models/ForumPost');


/**
 * 
 * @returns a collection of ForumPost JSON Objects
 */
async function getAllPosts() {
   try {
      const allPosts = await ForumPosts.find({});
      return allPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} Id The Id of the ForumPost to find 
 * @returns The ForumPost that matches the id parameter
 */

async function getPostById(postId){
   try {
      const forumPost = await ForumPosts.findById(postId);
      return forumPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a ForumPost 
 * @returns a collection of ForumPosts
 */

async function getPostByQuery(query){
   try {
      const forumPosts = await ForumPosts.find()
      .or(
            [
               {user_plant: query},
               {forum_post_title: query}, 
               {forum_post_body: query}
            ]
      );
      return forumPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} post A new ForumPost to store in the mongodb collection 
 */

async function storePost(post){
   try {
      const storedPost = await ForumPosts.create(post);
      return storedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} postId The ForumPost to edit 
 * @param {*} postBody The edit for the ForumPost
 */

async function updatePost(postId, postBody){
   try {
      const updatedPost = await ForumPosts.findByIdAndUpdate(postId, postBody); 
      return updatedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} postId The id of the ForumPost to delete 
 */

async function deletePost(postId){
   try {
      const deletedPost = await ForumPosts.findByIdAndDelete(postId);
      return deletedPost;
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
   updatePost,
   deletePost
};