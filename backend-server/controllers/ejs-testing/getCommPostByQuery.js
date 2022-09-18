/** 
 * Searches the communityposts collection for strings matching the regex query string in...
 * comm_post_title
 * comm_post_body
 * Can return multiple records as a collection
 */

const CommunityPosts = require('../../models/CommunityPost');

module.exports = async(req, res) =>{
   const commPosts = await CommunityPosts.find()
   .or(
         [
            {comm_post_title: {$regex:req.query.string}}, 
            {comm_post_body: {$regex:req.query.string}}
         ]
   );
   console.log(commPosts);
   res.render('communityPosts', {commPosts});
}