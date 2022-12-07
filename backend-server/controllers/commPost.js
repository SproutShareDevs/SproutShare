const express = require('express');
const router = express.Router();
const commPostServices = require('../services/commPostServices');

router.get('/', async(req, res) => {
   try {
      const allPosts = await commPostServices.getAllPosts();
      res.send(allPosts);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/search', async(req, res) =>{
   try {
      const commPosts = await commPostServices.getPostByQuery({$regex:req.query.string});
      res.send(commPosts);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/:id', async(req, res) => {
   try {
      const commPost = await commPostServices.getPostById(req.params.id);
      res.send(commPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 


router.post('/store', async(req,res) =>{
   try {
      const storedCommPost = await commPostServices.storePost(req.body);
      res.send(storedCommPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.post('/:id/addcomment', async(req, res) => {
   try {
      const storeCommentResponse = await commPostServices.storeComment(req.body, req.params.id);
      res.send(storeCommentResponse);
   } catch(error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
});

router.put('/update/:id', async(req,res)=>{
   try {
      const updatedCommPost = await commPostServices.updatePost(req.params.id, req.body);
      res.send(updatedCommPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:id', async(req, res)=>{
   try {
      const deletedCommPost = await commPostServices.deletePost(req.params.id);
      res.send(deletedCommPost);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;