const express = require('express');
const router = express.Router();
const commPostServices = require('../../../services/commPostServices');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   try {
      const commPosts = await commPostServices.getAllPosts();
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);
   }
})

/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
router.get('/id', async(req, res) => {
   const postId = req.query.id;
   try {
      const commPosts = [await commPostServices.getPostById(postId)];
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);   
   }
}) 

/** 
 * Searches the communityposts collection for strings matching the regex query string in...
 * comm_post_title
 * comm_post_body
 * Can return multiple records as a collection
 */
router.get('/search', async(req, res) =>{
   
   const query = {$regex:req.query.string};
   try {
      const commPosts = await commPostServices.getPostByQuery(query);
      res.render('communityPosts', {commPosts});
   } catch (error) {
      console.error(error);
   }
})

/** Handler for creating a community post */
router.post('/store', async(req,res) =>{
   const post = req.body;
   try {
      await commPostServices.storePost(post);
      res.redirect('/ejs-testing/communityPosts');
   } catch (error) {
      console.error(error);
   }
})
/**
 *  Updates a document in the communityposts collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   //const communityPost = await CommunityPosts.findByIdAndUpdate(req.params.id, {...req.body});
   const postBody = req.body;
   const postKey = req.params.id;
   try {
      await commPostServices.updatePost(postKey, postBody);
      return res.status(200).send(`${postKey} Successfully Updated`);
   } catch (error) {
      console.error(error);
   }
   res.redirect('/ejs-testing/communityPosts');
})

/**
 * Deletes a document in the communityposts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to communityPosts page
 */
router.delete('/delete/:id', async(req, res)=>{
   const postKey = req.params.id;
   try {
      await commPostServices.deletePost(postKey);
      res.redirect('/ejs-testing/communityPosts');
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/communityPosts');
})

module.exports = router;