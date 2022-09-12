/** Handler for creating a community post */
const CommunityPost = require('../models/CommunityPost');

module.exports = (req,res) =>{
   const commPost = req.body;
   CommunityPost.create(req.body, (error, communityPost)=>{
      console.log(req.body);
      if(error){
         console.log(error);
      }
   });
   res.redirect('/communityPosts');
}

