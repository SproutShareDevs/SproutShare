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
   }
}

/**
 * 
 * @param {*} Id The Id of the ForumPost to find 
 * @returns The ForumPost that matches the id parameter
 */

async function getPostById(postId){
   try {
      const singlePost = await ForumPosts.findById(postId);
      return singlePost;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a ForumPost 
 * @returns a collection of ForumPosts
 */

async function getPostByQuery(query){
   try {
      const posts = await ForumPosts.find()
      .or(
            [
               {user_plant: query},
               {forum_post_title: query}, 
               {forum_post_body: query}
            ]
      );
      return posts;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} post A new ForumPost to store in the mongodb collection 
 */

async function storePost(post){
   try {
      await ForumPosts.create(post);
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} postId The ForumPost to edit 
 * @param {*} postBody The edit for the ForumPost
 */

async function updatePost(postId, postBody){
   try {
      await ForumPosts.findByIdAndUpdate(postId, postBody); 
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} postId The id of the ForumPost to delete 
 */

async function deletePost(postId){
   try {
      await ForumPosts.findByIdAndDelete(postId);
   } catch (error) {
      console.error(error);
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