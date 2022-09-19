/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
const CommunityPost = require('../../../models/CommunityPost');
module.exports = async(req, res) => {
   const commPosts = [await CommunityPost.findById(req.query.id)];
   console.log(req.query.id);

   res.render('communityPosts', {commPosts});
}