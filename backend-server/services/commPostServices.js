const commPostDatabase = require('../database/commPostDatabase');

async function getAllPosts() {
   try {
      const allPosts = await commPostDatabase.getAllPosts();
      return allPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
   
};

async function getPostById(postId){
   try {
      const commPost = await commPostDatabase.getPostById(postId);
      return commPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getPostByQuery(query){
   try {
      const commPosts = await commPostDatabase.getPostByQuery(query);
      return commPosts;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storePost(post){
   try {
      const storedPost = await commPostDatabase.storePost(post);
      return storedPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeComment(comment, postID) {
   try {
      const storedComment = await commPostDatabase.storeComment(comment, postID);
      return storedComment;
   } catch(error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updatePost(postId, postBody){
   try {
      const updatedCommPost = await commPostDatabase.updatePost(postId, postBody);
      return updatedCommPost;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deletePost(postId){
   try {
      const deletedCommPost = await commPostDatabase.deletePost(postId);
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
}