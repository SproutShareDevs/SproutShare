/**
 * Deletes a document in the communityposts collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to communityPosts page
 */
const CommunityPosts = require('../../models/CommunityPost');

module.exports = async(req, res)=>{
   const communityPost = await CommunityPosts.findByIdAndDelete(req.params.id);  
   console.log(communityPost);
   res.redirect('/communityPosts');
}