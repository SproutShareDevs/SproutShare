# SproutShare - How to Run

## Recent Postgres Updates

#### *The Postgres Sproutshareuser table was updated, and 'AlterTables.sql' must be ran to update the changes to the table*

#### *If you are in the project root directory, the command to run it is:* 'psql -U $username -d $dbname -a -f backend-server\db\AlterTables.sql'
#### *Then TableAndMockData_loader.sql can be ran to repopulate the tables if you wish via:* 'psql -U $username -d $dbname -a -f backend-server\db\AlterTables.sql'
#### *Note that $username is equal to your Postgres username, and $dbname is equal to your Postgres database name*

## Environment Variable Updates (.env Files)

### Back End

### *In /backend-server's root directory, create a file called '.env', and define the following variables within it*

#### 1. DATABASE_NAME - *Set this equal to the name of your Postgres Database*
#### 2. DB_PASSWORD - *set this equal to your Postgres Database Password*
#### 3. ACCESS_TOKEN_SECRET - *Open a terminal window. Run 'node'. Run the command:* 'require('crypto').randomBytes(16).toString('hex')' *This will generate a random varchar string, set the variable equal to it*
##### *Example of what will be spit out:* '7495d5b97b5cd77794d08cfdf0e2c238'
#### 4. REFRESH_TOKEN_SECRET - *Repeat the same process, run 'node', then the command:* 'require('crypto').randomBytes(16).toString('hex')' *and set the variable equal to it*

### *Example backend .env*
#### DATABASE_NAME="SproutShare"
#### DB_PASSWORD="password"
#### ACCESS_TOKEN_SECRET='4c0cc0b025a29d60032abf0730d8fe1c'
#### REFRESH_TOKEN_SECRET='7495d5b97b5cd77794d08cfdf0e2c238'

### Front End

### *In /sproutshare-client's root directory, create a file called '.env', and define the following variables within it*

#### 1. NODE_SERVER - *Set this equal to your local IPV4 IP Address. You can get this by running 'ipconfig' in a terminal*

### *Example frontend .env*
#### NODE_SERVER = 'http://192.168.3.7:3000'


## Emulator

### Android Studio

#### 1. *Install [Android Studio](https://developer.android.com/studio/)*
#### 2. *Install an android emulator with play store connectivity i.e Pixel 3a*


## NPM Dependencies

### Expo

#### *Ensure Expo is installed:* [Expo](https://docs.expo.dev/get-started/installation/).

#### *In /sproutshare-client run:* "npm install"

### *click this link to make expo account:* [Expo Account](https://expo.dev/).
### *In /sproutshare-client run:* "npx expo login" and login with credentatials created above

### Node Server 

### *Ensure Node.Js is installed*: [Node.js](https://nodejs.org/en/download/)

#### *nodemon- for your server to autoupdate when editing the backend locally:*  npm install -g nodemon
#### *In /sproutshare-client run:* "npm install"

### Local Tunnel

#### In order to communicate between node and react native, the server must be ran on an https server (not local host). This is where localtunnel helps out by forwarding your localhost server to a https server

#### *Install local tunnel globally:* npm install -g localtunnel

## Database Setup

### MongoDB

#### 1. *Install MongoDB v4.4.16:* https://www.mongodb.com/try/download/community?tck=docs_server
#### 2. *Add MongoDB bin to path, default located at C:\Program Files\MongoDB\Server\4.4\bin
#### 3. *To test proper setup, run in separate cmd window: "mongod" 

### PostgreSQL

### 1. *Install Postgres:* https://www.postgresql.org/download/ 

## Start The App

### Start Up The Server

#### 1. *cd into*: /backend-server
#### 2. *Start the local node server with*: nodemon app.js
#### 3. *Open a new terminal window. Now, port forward the server to localtunnel:* "lt --port 3000" (it will give you a https server to point the react native app to)

### Start Up The Expo App

#### 0. Ensure that the nodeServer variable in App.js points to the localtunnel link that was generated. This must be done everytime a new server is created. 
#### 1. Run an android emulator on your PC with Play Store Connectivity (the ones with the play store logo next to it)
#### 2. *Open a new terminal window. cd into:* /node-native/expo-client
#### 3. *Start the expo app with:* "npm start"
#### 4. *Run your emulator in android studio*
#### 5. *Connect your expo session to the emulator by entering:* "a"
#### 6. *When making changes in the front end, to see some changes you need to reload the app by entering:* "r"


## Tom Old Instructions

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
