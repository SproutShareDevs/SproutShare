const express = require('express');
const router = express.Router();
const CommunityPosts = require('../../models/CommunityPost');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for sending
*/
router.get('/', async(req, res) => {
   const commPosts = await CommunityPosts.find({});
   res.send(commPosts);
})

/** 
 * This route gets a community post ID via parameter in the get request and sends it in EJS 
 */
router.get('/id', async(req, res) => {
   const commPosts = [await CommunityPosts.findById(req.query.id)];
   res.send(commPosts);
}) 

/** 
 * Searches the communityposts collection for strings matching the regex query string in...
 * comm_post_title
 * comm_post_body
 * Can return multiple records as a collection
 */
router.get('/search', async(req, res) =>{
    const commPosts = await CommunityPosts.find()
    .or(
          [
             {comm_post_title: {$regex:req.query.string}}, 
             {comm_post_body: {$regex:req.query.string}}
          ]
    );
    res.send('communityPosts', {commPosts});
})

/** Handler for creating a community post */
router.post('/store', (req,res) =>{
   CommunityPosts.create(req.body, (error, communityPost)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.send(req.body);
})
/**
 *  
 */
router.put('update/:id', async(req,res)=>{
   const communityPost = await CommunityPosts.findByIdAndUpdate(req.params.id, {...req.body});
   res.send(communityPost);
})

/**
 * Deletes a document in the communityposts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to communityPosts page
 */
router.delete('delete/:id', async(req, res)=>{
    const communityPost = await CommunityPosts.findByIdAndDelete(req.params.id);  
    res.send(communityPost);
})

module.exports = router;