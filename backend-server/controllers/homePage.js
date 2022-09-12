/** Route handling for home page */

let homepageResponse = {
   message: "Welcome to SproutShare!"
}

module.exports = (req, res) => {
   res.send(homepageResponse);
}