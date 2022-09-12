# SproutShare

Local DB requirements
1. Install mongodb v3.6.23 or above
2. Install postgres 14.5 
3. Run SQL data loader (maybe we can do this?)

How To Run
1. Install dependencies by using "npm install" from the SproutShare directory.
2. Run using "npm start" from the SproutShare directory.
3. Start mongodb by entering 'mongod' in a terminal window such as Powershell (windows)
   -  The DB name is SproutShareNoSQL. However, you can change this for your local enviroment.
4. Application URL: localhost:3000/

Notes:

Added ejs for dynamic webpages
Put some ejs pages in the view folder as a temporary way to see the application behavior.  
These will be replaced in production by react native views, and at most repurposed for testing
