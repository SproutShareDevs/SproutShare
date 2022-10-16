const forumPostDatabase = require('../database/forumPostDatabase');

async function getAllPosts() {
   try {
      const allPosts = await forumPostDatabase.getAllPosts();
      return allPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
   
};

async function getPostById(postId){
   try {
      const forumPost = await forumPostDatabase.getPostById(postId);
      return forumPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getPostByQuery(query){
   try {
      const forumPosts = await forumPostDatabase.getPostByQuery(query);
      return forumPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storePost(post){
   try {
      const storedPost = await forumPostDatabase.storePost(post);
      return storedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updatePost(postId, postBody){
   try {
      const updatedPost = await forumPostDatabase.updatePost(postId, postBody);
      return updatedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deletePost(postId){
   try {
      const deletedPost = await forumPostDatabase.deletePost(postId);
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
}