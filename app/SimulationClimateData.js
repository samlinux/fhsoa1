/**
 * SimulationClimateData module
 *
 * @module app/SimulationClimateData
 * @author rbole <rbole@samlinux.at>
 */
(function(){
	'use strict';

	/**
 	 * Represents a SimulationClimateData object
 	 * @constructor
 	 */
	var SimulationClimateData = function(appOptions){
		this.AppOptions = appOptions;

		// Intervall for one request in seconds
		this.SendRequestInSeconds = 4;

		// check if get param is allown and if yes start the simulation timer
		// if not stop the simulation
		if(this.AppOptions._.has(this.AppOptions,'reqParams.modus')){
			if(this.AppOptions._.indexOf(['on','off'],this.AppOptions.reqParams.modus) !== -1){
				this.Simulation = this.AppOptions.reqParams.modus;
			}
		} else {
			this.Simulation = 'off';
		}
	};	

	/**
 	 * Controll the start or stop status of the simulation
 	 */
	SimulationClimateData.prototype.init = function(){
		var deferred = this.AppOptions.q.defer();
		var status = '', _this = this;
		if(this.Simulation === 'on'){
			// start simulation
			status = 'start simulation';
			this.AppOptions.simulationTimer = setInterval(function(){
				_this.sendRequest();}, (this.SendRequestInSeconds*1000));
		} else {
			// stop simulation
			status = 'stop simulation';
			clearInterval(this.AppOptions.simulationTimer);
		}
	
		deferred.resolve(status);	
		return deferred.promise;
	};

	/**
 	 * Send data 
 	 */
	SimulationClimateData.prototype.sendRequest = function(){
		var _this = this;
		var url = this.AppOptions.config.BaseUrl+
				'/climate.json'+
				this.AppOptions.config.Auth;
		
		var data = this.prepareSimulationData(this.AppOptions.reqData);
		this.AppOptions.request.post(this.setRequestData(data), function (err, response, body) {
			if(err){ 
				throw err;
			}
		});
	};

	/**
	 * Create simulation data
	 */
	SimulationClimateData.prototype.prepareSimulationData = function(data){
		var _data2store = {};
		
		this.AppOptions._.set(_data2store,'timestamp',new Date());
		this.AppOptions._.set(_data2store,'temperature',this.AppOptions._.random(-10,30,true));
		this.AppOptions._.set(_data2store,'humidity',this.AppOptions._.random(40,60,true));
		
		return _data2store;
	};

	/**
	 * Prepare simulation data for simulation
	 */
	SimulationClimateData.prototype.setRequestData = function(data){
		var rq = {}, url = '';
		if(this.AppOptions._.isNull(data) || this.AppOptions._.isUndefined(data)){
			data = {};
		}
		
		url = this.AppOptions.config.BaseUrl+
				'/climate.json'+
				this.AppOptions.config.Auth;
		
		this.AppOptions._.set(rq,'url',url);
		this.AppOptions._.set(rq,'json',true);
		this.AppOptions._.set(rq,'headers',{'content-type': 'application/json'});
		this.AppOptions._.set(rq,'body',data);
		return rq;
	};

	module.exports.SimulationClimateData = SimulationClimateData;
})();