const express = require('express');
const router = express.Router();
const forumPostServices = require('../services/forumPostServices');

router.get('/', async(req, res) => {
   try {
      const allPosts = await forumPostServices.getAllPosts();
      res.send(allPosts);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/search', async(req, res) =>{
   try {
      const forumPosts = await forumPostServices.getPostByQuery({$regex:req.query.string});
      res.send(forumPosts);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/:id', async(req, res) => {
   try {
      const forumPost = await forumPostServices.getPostById(req.params.id);
      res.send(forumPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 

router.post('/store', async(req,res) =>{
   try {
      const storedForumPost = await forumPostServices.storePost(req.body);
      res.send(storedForumPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:id', async(req,res)=>{
   try {
      const updatedForumPost = await forumPostServices.updatePost(req.params.id, req.body);
      res.send(updatedForumPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:id', async(req, res)=>{
   try {
      const deletedForumPost = await forumPostServices.deletePost(req.params.id);
      res.send(deletedForumPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;