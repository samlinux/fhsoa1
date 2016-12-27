#SSOA Practical example

The solution is build on top of express.js. 

What have we done is a REST API build around the google Firebase REST API to simulate a climate datastorage process.

- The API is accessible via http://localhost:3000
- The API documentation is available via route http://localhost:3000/apidoc

##Firebase REST API

- Routes, done
    + GET /
    + GET /info
    + GET /:id
    + POST /
    + PATCH /
    + PUT /
    + DELETE /
- API documentation, done
- API tests, done

## Installation

### Install node.js 
If node.js is not already installed, please use this instructions https://nodejs.org/en/download/package-manager/.

### Clone the git repo
https://github.com/samlinux/fhsoa1


### Install all dependicies
```
cd [project home]  
npm install
```

**IMPORTANT: For the missing config file contact the author.**

### Get your own Firebase API key
https://firebase.google.com/

Create a config.js file in to project root directory and paste the following code into it.
```  
 cd [project home]
 vi config.js (and insert the following) 
 var config = {};
 config.BaseUrl = 'https://[YOUR-Database].firebaseio.com';
 config.Token = '[YOUR-APIKEY]';
 config.Auth = '?auth='+config.Token;
 module.exports = config;
```

### Start the Rest API
```
cd [project home]  
node app/server.js
```
### Start the API documentation
```
cd [project home]  
node_modules/apidoc/bin/apidoc -i ./ -f "server.js" -o apidoc/ 
```
### Start the tests
```
cd [project home]  
mocha test/TestClimateApi.js 
```

