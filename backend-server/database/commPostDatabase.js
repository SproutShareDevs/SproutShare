const CommunityPosts = require('../models/CommunityPost');


/**
 * 
 * @returns a collection of CommunityPost JSON Objects
 */
async function getAllPosts() {
   try {
      const allPosts = await CommunityPosts.find({});
      return allPosts;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} Id The Id of the Community Post to find 
 * @returns The community post that matches the Id parameter
 */

async function getPostById(postId){
   try {
      const singlePost = await CommunityPosts.findById(postId);
      return singlePost;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a community post  
 * @returns a collection of community posts
 */

async function getPostByQuery(query){
   try {
      const posts = await CommunityPosts.find()
      .or(
            [
               {comm_post_title: query}, 
               {comm_post_body: query}
            ]
      );
      return posts;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} post A new community post to store in the mongodb collection 
 */

async function storePost(post){
   try {
      await CommunityPosts.create(post);
   } catch (error) {
      console.error(error);
   }
}

async function updatePost(postId, postBody){
   try {
      await CommunityPosts.findByIdAndUpdate(postId, postBody); 
   } catch (error) {
      console.error(error);
   }
}

async function deletePost(postId){
   try {
      await CommunityPosts.findByIdAndDelete(postId);
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