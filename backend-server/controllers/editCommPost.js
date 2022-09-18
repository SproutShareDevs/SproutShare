const CommunityPosts = require('../models/CommunityPost');

module.exports = async(req,res)=>{
   const communityPost = await CommunityPosts.findByIdAndUpdate(req.params.id, {...req.body});
   res.send(communityPost);
}