const express = require('express');
const router = express.Router();
const forumPostServices = require('../../../services/forumPostServices');

router.get('/', async(req, res) => {
   try {
      const forumPosts = await forumPostServices.getAllPosts();
      res.render('forumPosts', {forumPosts});
   } catch (error) {
      console.error(error);
   }
})

router.get('/id', async(req, res) => {
   const postId = req.query.id;
   try {
      const forumPosts = [await forumPostServices.getPostById(postId)];
      res.render('forumPosts', {forumPosts});
   } catch (error) {
      console.error(error);   
   }
}) 

router.get('/search', async(req, res) =>{
   
   const query = {$regex:req.query.string};
   try {
      const forumPosts = await forumPostServices.getPostByQuery(query);
      res.render('forumPosts', {forumPosts});
   } catch (error) {
      console.error(error);
   }
})

router.post('/store', async(req,res) =>{
   const post = req.body;
   try {
      await forumPostServices.storePost(post);
      res.redirect('/ejs-testing/forumPosts');
   } catch (error) {
      console.error(error);
   }
})

router.put('/update/:id', async(req,res)=>{
   const postBody = req.body;
   const postId = req.params.id;
   try {
      await forumPostServices.updatePost(postId, postBody);
      return res.status(200).send(`${postId} Successfully Updated`);
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/forumPosts');
})

router.delete('/delete/:id', async(req, res)=>{
   const postId = req.params.id;
   try {
      await forumPostServices.deletePost(postId);
      res.redirect('/ejs-testing/forumPosts');
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/forumPosts');
})
module.exports = router;