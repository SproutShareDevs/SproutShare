const CommunityPosts = require('../../../models/CommunityPost');

module.exports = async(req,res)=>{
   const tempObject = req.body;
   const communityPost = await CommunityPosts.findByIdAndUpdate(req.params.id, {...req.body});
   console.log(communityPost);
   res.redirect('/ejs-testing/communityPosts');
}