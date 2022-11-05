const express = require('express');
const router = express.Router();
const commPostServices = require('../../services/commPostServices');

router.get('/', async(req, res) => {
   try {
      const commPosts = await commPostServices.getAllPosts();
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);
      res.json("check logs");
   }
})

router.get('/id', async(req, res) => {
   const postId = req.query.id;
   try {
      const commPosts = [await commPostServices.getPostById(postId)];
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);   
   }
}) 

router.get('/search', async(req, res) =>{
   
   const query = {$regex:req.query.string};
   try {
      const commPosts = await commPostServices.getPostByQuery(query);
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);
   }
})

router.post('/store', async(req,res) =>{
   const post = req.body;
   try {
      await commPostServices.storePost(post);
      res.redirect('/ejs-testing/communityPosts');
   } catch (error) {
      console.error(error);
   }
})

router.put('/update/:id', async(req,res)=>{
   const postBody = req.body;
   const postId = req.params.id;
   try {
      await commPostServices.updatePost(postId, postBody);
      return res.status(200).send(`${postId} Successfully Updated`);
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/communityPosts');
})

router.delete('/delete/:id', async(req, res)=>{
   const postId = req.params.id;
   try {
      await commPostServices.deletePost(postId);
      res.redirect('/ejs-testing/communityPosts');
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/communityPosts');
})

module.exports = router;