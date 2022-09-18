/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
const CommunityPost = require('../../models/CommunityPost');

module.exports = async(req, res) => {
   const commPosts = await CommunityPost.find({});
   
   res.render('communityPosts', {commPosts});
}