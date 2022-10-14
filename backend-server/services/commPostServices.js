const commPostDatabase = require('../database/commPostDatabase');

async function getAllPosts() {
   try {
      const allPosts = await commPostDatabase.getAllPosts();
      return allPosts;
   } catch (error) {
      console.error(error);
   }
   
};

async function getPostById(postId){
   try {
      const singlePost = await commPostDatabase.getPostById(postId);
      return singlePost;
   } catch (error) {
      console.error(error);
   }
}

async function getPostByQuery(query){
   try {
      const posts = await commPostDatabase.getPostByQuery(query);
      return posts;
   } catch (error) {
      console.error(error);
   }
}

async function storePost(post){
   try {
      await commPostDatabase.storePost(post);
   } catch (error) {
      console.error(error);
   }
}

async function updatePost(postId, postBody){
   try {
      await commPostDatabase.updatePost(postId, postBody);
   } catch (error) {
      console.error(error);
   }
}

async function deletePost(postId){
   try {
      await commPostDatabase.deletePost(postId);
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