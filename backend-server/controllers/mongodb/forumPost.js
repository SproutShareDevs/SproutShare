const express = require('express');
const router = express.Router();
const ForumPosts = require('../../models/ForumPost');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   const forumPosts = await ForumPosts.find({});
   res.send(forumPosts);
})

/** 
 * Searches the ForumPosts collection for strings matching the regex query string in...
 * user_plant
 * forum_post_title
 * forum_post_body
 * Can return multiple records as a collection
 */
 router.get('/search', async(req, res) =>{
   const forumPosts = await ForumPosts.find()
   .or(
         [
           {user_plant: {$regex:req.query.string}}, 
           {forum_post_title: {$regex:req.query.string}}, 
           {forum_post_body: {$regex:req.query.string}}
         ]
   );
   res.send(forumPosts);
})

/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
router.get('/:id', async(req, res) => {
   const forumPost = await ForumPosts.findById(req.params.id);
   res.send(forumPost);
}) 

/** Handler for creating a community post */
router.post('/store', (req,res) =>{
   ForumPosts.create(req.body, (error, forumPost)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.send(req.body);
})
/**
 *  Updates a document in the ForumPosts collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   const forumPost = await ForumPosts.findByIdAndUpdate(req.params.id, {...req.body});
   res.send(forumPost);
})

/**
 * Deletes a document in the ForumPosts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to ForumPosts page
 */
router.delete('/delete/:id', async(req, res)=>{
    const forumPost = await ForumPosts.findByIdAndDelete(req.params.id);  
    res.send(forumPost);
})

module.exports = router;