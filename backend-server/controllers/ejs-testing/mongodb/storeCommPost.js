/** Handler for creating a community post */
const CommunityPost = require('../../../models/CommunityPost');

module.exports = (req,res) =>{
   CommunityPost.create(req.body, (error, communityPost)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.redirect('/ejs-testing/communityPosts');
}

