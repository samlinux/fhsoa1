#SOA Data Logger Example
This work is based on a seminar paper *A Security Threat Analysis for Cloud-based Temperature Sensor Solutions* by Roland Bole and Andree Niebuhr (FH Burgenland).

Please, ask questions about the source code or other project-releated topics to one of the authors.

The solution is built on top of express.js and deployed as a Docker image. The Docker image is based on alpine:3.4 and node.js 4.7.0, see the Docker file as well. 

A REST API from scratch was built around Google's Firebase REST API to simulate a climate datastorage process.

- The API is accessible via http://SERVER:PORT
- The API documentation is available via route http://SERVER:PORT/apidoc

##The Climate REST API includes 

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
- The app is deliverd as a Docker image, please ask the authors for the image.
- API documentation, the link you can find above
- A running live version is also available, for the link see above.

## Installation
If you want to try the program yourself, follow the instructions below.

### Install node.js 
If node.js is not already installed, please use these instructions https://nodejs.org/en/download/package-manager/.
For this exmplampe node.js version 4.7.0. is used.

### Clone the Git Repo
https://github.com/samlinux/fhsoa1

### Install All Dependicies
```
cd [project home]  
npm install
```

**IMPORTANT: For the missing config file contact the authors.**

### Get your Own Firebase API Key
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
### Start the API Documentation
```
cd [project home]  
node_modules/apidoc/bin/apidoc -i ./ -f "server.js" -o apidoc/ 
```
### Start the API Tests
```
cd [project home]  
mocha test/TestClimateApi.js 
```

# Docker Related Notes
A running Docker engine is required on the host operating system.

- Helpful Docker commands
    + docker images
    + docker ps 
    + docker stop <running container id>
    + docker start <running container id>
- Create a new Docker image or ask the authors for the Docker image
    - docker build -t fh/soa1:v1 .
- Run the image as a container
    - docker run -p 49160:3000 -d <image>
- Save the image to a tar file und deploy it to another server
    - docker save <image> | bzip2 | ssh user@host 'bunzip2 | docker load'
- Load a saved Docker image into an other Docker engine
    - docker load -i <path to image tar file>


# Change-Log
**06.01.2017**
- Missing copyright has been added to some files.
- MIT license has been added to the project.

