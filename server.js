// Global libs
var express = require('express');
var app = express();
var q = require('q');
var _ = require('lodash');
var request = require('request');
var bodyParser = require('body-parser');

// App classes
var GetClimateData = require('./app/GetClimateData.js').GetClimateData;
var StoreClimateData = require('./app/StoreClimateData.js').StoreClimateData;
var DeleteClimateData = require('./app/DeleteClimateData.js').DeleteClimateData;
var GetClimateDetailData = require('./app/GetClimateDetailData.js').GetClimateDetailData;
var SimulationClimateData = require('./app/SimulationClimateData.js').SimulationClimateData;

// Setup all need libaries globally
var AppOptions = {};
	AppOptions.config = require('./config.js');
	AppOptions.q = q;
	AppOptions._ = _;
	AppOptions.request = request;
	AppOptions.simulationTimer = null;

// Enable post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set route for apidoc in static manner
app.use('/apidoc', express.static('apidoc'));

// Set route for public in static manner
app.use('/public', express.static('public'));

/**
 * API server listen on 
 */
app.listen(3000, function () {
  console.log('app listen on port 3000!');
});

/**
 * @api {get} /simulation/:modus Start or stop simulation
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:3000/simulation/on || off
 * @apiGroup climate
 *
 * @apiSuccessExample Success-Response:
 *	HTTP/1.1 200 OK
 *	"data": "string"
 * 
 * @apiDescription Start or stop the simulation, every 4 seconds random temperature and humidity data are send to the API
 */
app.get('/simulation/:modus', function (req, res) {
	AppOptions._.set(AppOptions,'reqParams',AppOptions._.cloneDeep(req.params));
	var _a = new SimulationClimateData(AppOptions);
		_a.init().then(function(result){
			res.json({data:result});
		});
});

/**
 * @api {get} / Get all datasets
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:3000
 * @apiGroup climate
 *
 * @apiSuccess {Array[]} data includes all datasets as objects
 * @apiSuccess {Object} climate Climate object
 * @apiSuccess {Date} climate.timestamp date and time of the dataset
 * @apiSuccess {Number} climate.temperature measured temperature 
 * @apiSuccess {Number} climate.humidity measured humidity 
 *
 * @apiSuccessExample Success-Response:
 *	HTTP/1.1 200 OK
 *	"data": [
 *		{
 *			"id":"-KYthvj98TpxEPdIpFWW",
 *			"timestamp": "2016-12-26 12:20:20",
 *			"temperature": 12,
 *			"humidity": 55
 *   		}
 *	]
 * @apiDescription Provides all climate information from the firebase database
 */
app.get('/', function (req, res) {
	var _a = new GetClimateData(AppOptions,false);
		_a.getData().then(function(result){
			res.json({data:result});
		});
});

/**
 * @api {get} /getLastValue Returns the last value
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:3000/getLastValue
 * @apiGroup climate
 *
 * @apiSuccess {Object} climate Climate object
 * @apiSuccess {Date} climate.timestamp date and time of the dataset
 * @apiSuccess {Number} climate.temperature measured temperature 
 * @apiSuccess {Number} climate.humidity measured humidity 
 *
 * @apiSuccessExample Success-Response:
 *	HTTP/1.1 200 OK
 *	"data": {
 *			"id":"-KYthvj98TpxEPdIpFWW",
 *			"timestamp": "2016-12-26 12:20:20",
 *			"temperature": 12,
 *			"humidity": 55
 *   	}
 * @apiDescription Returns the last available climate dataset
 */
app.get('/getLastValue', function (req, res) {
	var _a = new GetClimateData(AppOptions,true);
		_a.getData().then(function(result){
			res.json({data:result});
		});
});

/**
 * @api {get} /info Check if API is accessible
 * @apiExample {curl} Example usage:
 *   curl -i http://localhost:3000/info
 * @apiGroup climate
 *
 * @apiSuccess {Number} version 
 *
 * @apiSuccessExample Success-Response:
 *	HTTP/1.1 200 OK
 *	"version": 1
 *
 * @apiDescription Provides a version number as symbole the api is accessible
 */
app.get('/info', function (req, res) {
	res.json({version:1});
});

/**
 * @api {get} /:id Get one specific dataset
 * @apiExample {curl} Example usage:
 * curl -X GET -i http://localhost:3000/-KZvAMz9zE4e78U4D7bK -H "Content-Type: application/json"
 * @apiGroup climate
 *
 * @apiSuccess {Object} data includes the climate data
 * @apiSuccess {Object} climate Object
 * @apiSuccess {Date} climate.timestamp date and time of the dataset
 * @apiSuccess {Number} climate.temperature measured temperature 
 * @apiSuccess {Number} climate.humidity measured humidity 
 *
 * @apiSuccessExample Success-Response:
 *	HTTP/1.1 200 OK
 *	"data":{
 * 		"id":"-KYthvj98TpxEPdIpFWW",
 *		"timestamp": "2016-12-26 12:20:20",
 *		"temperature": 12,
 *		"humidity": 55
 *   	}
 * @apiDescription Provides all climate information from a requested dataset ID
 */
app.get('/:id', function (req, res) {
	AppOptions._.set(AppOptions,'reqParams',AppOptions._.cloneDeep(req.params));
	var _a = new GetClimateDetailData(AppOptions);
		_a.getDetailData().then(function(result){
			res.json({data:result});
		});
});

/**
 * @api {post} / Store a new dataset
 * @apiExample {curl} Example usage:
 * curl -X POST -d '{"temperature":23,"humidity":40}' \
 * -i http://localhost:3000 -H 'Content-Type: application/json'
 * @apiGroup climate
 *
 * @apiParam {Double} temperature	current temperature
 * @apiParam {Double} humidity	current humidity
 * @apiParam {Date} timestampe	current date and time (format to use: YYYY-MM-DD HH:MM:SS)
 *
 * @apiDescription Stores a new climate dataset
 *
 * @apiSuccess {String} key Id from the new dataset
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {key:"-KZvh5h74KfMzevytDQ0"}
 *
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/', function (req, res) {
	AppOptions._.set(AppOptions,'reqData',AppOptions._.cloneDeep(req.body));

	var _a = new StoreClimateData(AppOptions);
		_a.storeData('insert').then(function(result){
			if(!result){
				res.send(500);
			} else {
				res.json(result);	
			}
		});
});

/**
 * @api {patch} / Patch an existing dataset
 * @apiExample {curl} Example usage:
 * curl -X PATCH -d '{"id":"-KZv9td4RRj4iui0HvtZ","data":{"temperature":100}}' \
 * -i http://localhost:3000 -H "Content-Type: application/json"
 * @apiGroup climate
 *
 * @apiParam {String} id	Id to patch
 * @apiParam {Object} data 	data to patch
 * @apiParam {Double} data.temperature	temperature to patch
 * @apiParam {Double} data.humidity	humidity to patch
 * @apiParam {Date} data.timestampe	date to patch (format to use: YYYY-MM-DD HH:MM:SS)
 *
 * @apiDescription Patches a climate dataset, the dataset will be supplemented with the given data
 *
 * @apiSuccess {String} key Id from the new dataset
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {true}
 *
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.patch('/', function (req, res) {
	AppOptions._.set(AppOptions,'reqData',AppOptions._.cloneDeep(req.body));

	var _a = new StoreClimateData(AppOptions);
		_a.storeData('patch').then(function(result){
			if(!result){
				res.send(500);
			} else {
				res.json(result);	
			}
		});
});

/**
 * @api {pull} / Pull an existing dataset
 * @apiExample {curl} Example usage:
 * curl -X PULL -d '{"id":"-KZv9td4RRj4iui0HvtZ","data":{"temperature":100}}' \
 * -i http://localhost:3000 -H "Content-Type: application/json"
 * @apiGroup climate
 *
 * @apiParam {String} id	Id to patch
 * @apiParam {Object} data 	data to patch
 * @apiParam {Double} data.temperature	temperature to patch
 * @apiParam {Double} data.humidity	humidity to patch
 * @apiParam {Date} data.timestampe	date to patch (format to use: YYYY-MM-DD HH:MM:SS)
 *
 * @apiDescription Pull or update an exiting dataset, the dataset will be rewritten with the given information
 *
 * @apiSuccess {String} key Id from the new dataset
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {true}
 *
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.put('/', function (req, res) {
	AppOptions._.set(AppOptions,'reqData',AppOptions._.cloneDeep(req.body));
	
	var _a = new StoreClimateData(AppOptions);
		_a.storeData('put').then(function(result){
			res.json({data:result});
		});
});

/**
 * @api {delete} / Delete an existing dataset
 * @apiExample {curl} Example usage:
 * curl -X DELETE -d '{"id":"-KZv9td4RRj4iui0HvtZ"} \
 * -i http://localhost:3000 "Content-Type: application/json"
 * @apiGroup climate
 *
 * @apiParam {String} id	Id to delete
 *
 * @apiDescription Delete an exiting dataset
 *
 * @apiSuccess {String} key Id from the new dataset
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {true}
 *
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.delete('/', function (req, res) {
	AppOptions._.set(AppOptions,'reqData',AppOptions._.cloneDeep(req.body));
	
	var _a = new DeleteClimateData(AppOptions);
		_a.deleteData().then(function(result){
			res.json({data:result});
		});
});




