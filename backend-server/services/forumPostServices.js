const forumPostDatabase = require('../database/forumPostDatabase');

async function getAllPosts() {
   try {
      const allPosts = await forumPostDatabase.getAllPosts();
      return allPosts;
   } catch (error) {
      console.error(error);
   }
   
};

async function getPostById(postId){
   try {
      const singlePost = await forumPostDatabase.getPostById(postId);
      return singlePost;
   } catch (error) {
      console.error(error);
   }
}

async function getPostByQuery(query){
   try {
      const posts = await forumPostDatabase.getPostByQuery(query);
      return posts;
   } catch (error) {
      console.error(error);
   }
}

async function storePost(post){
   try {
      await forumPostDatabase.storePost(post);
   } catch (error) {
      console.error(error);
   }
}

async function updatePost(postId, postBody){
   try {
      await forumPostDatabase.updatePost(postId, postBody);
   } catch (error) {
      console.error(error);
   }
}

async function deletePost(postId){
   try {
      await forumPostDatabase.deletePost(postId);
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
}