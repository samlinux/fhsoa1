#SOA data logger example
This work is based on a seminar paper *A Security Threat Analysis for Cloud-based Temperature Sensor Solutions* by FH Burgenland. Roland Bole and Andree Niebuhr have worked on this.

Questions to the sourc-code or other project releated topics please to one of the authors.

The solution is build on top of express.js and deployed as docker image. The docker image is based on alpine:3.4 and node.js 4.7.0, see the Dockerfile as well. 

What have we done was a REST API build from scratch around googles Firebase REST API to simulate a climate datastorage process.

- The API is accessible via http://SERVER:PORT
- The API documentation is available via route http://SERVER:PORT/apidoc

##Climate REST API includes 

- API Routes
    + GET /
    + GET /info
    + GET /:id
    + GET /getLastValue
    + GET /simulation/on || off
    + POST /
    + PATCH /
    + PUT /
    + DELETE /
- API tests for main routes
- App is deliverd as docker image, ask the author for the image
- API documentation, link see our paper
- A running live version is also available, for the link see our paper

## Installation
If you want to try the program yourself, follow the instructions below.

### Install node.js 
If node.js is not already installed, please use this instructions https://nodejs.org/en/download/package-manager/.
For this exmplae we use node.js version 4.7.0.

### Clone the git repo
https://github.com/samlinux/fhsoa1

### Install all dependicies
```
cd [project home]  
npm install
```

**IMPORTANT: For the missing config file contact the author**

### Get your own Firebase API key
https://firebase.google.com/

Create a config.js file into your project root directory and paste the following code into it.
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
### Start the API tests
```
cd [project home]  
mocha test/TestClimateApi.js 
```

# Docker related notes
As requirement a running docker-enging is required on the host operating system.

- Helpful docker commands
    + docker images
    + docker ps 
    + docker stop <running container id>
    + docker start <running container id>
- Create a new Docker image or download the docker image from the author
    - docker build -t fh/soa1:v1 .
- Run the image as container
    - docker run -p 49160:3000 -d <image>
- Save the image to a tar file und deploye it to an other server
    - docker save <image> | bzip2 | ssh user@host 'bunzip2 | docker load'
- Load a saved docker image into an other docker-enging
    - docker load -i <path to image tar file>



