const express = require('express');
const router = express.Router();
const Users = require('../../../models/User');

/** 
 * For displaying the community post page
 * Queries the Users collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   const users = await Users.find({});
   res.render('users', {users});
})

/** 
 * This route gets a User ID via parameter in the get request and renders it in EJS 
 */
router.get('/id', async(req, res) => {
   const users = [await Users.findById(req.query.id)];
   res.render('users', {users});
}) 

/** 
 * Searches the Users collection for strings matching the regex query string in...
 * ex_plant
 * ex_post_title
 * ex_post_body
 * Can return multiple records as a collection
 */
router.get('/query', async(req, res) =>{
    const users = await Users.find()
    .or(
          [
            {username: {$regex:req.query.string}}, 
            {first_name: {$regex:req.query.string}}, 
            {last_name: {$regex:req.query.string}}
          ]
    );
    res.render('users', {users});
})

/** Handler for creating a user */
router.post('/store', (req,res) =>{
    Users.create(req.body, (error, users)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.redirect('/ejs-testing/users');
})
/**
 *  Updates a document in the Users collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   const users = await Users.findByIdAndUpdate(req.params.id, {...req.body});
   res.redirect('/ejs-testing/users');
})

/**
 * Deletes a document in the Users collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to Users page
 */
router.delete('/delete/:id', async(req, res)=>{
    const users = await Users.findByIdAndDelete(req.params.id);  
    res.redirect('/ejs-testing/users');
})

module.exports = router;