/**
 * StoreClimateData module
 *
 * @module app/StoreClimateData
 * @author rbole <rbole@samlinux.at>
 */
(function(){
	'use strict';

	/**
 	 * Represents a store object
 	 * @constructor
 	 */
	var StoreClimateData = function(appOptions){
		this.AppOptions = appOptions;
	};	


	/**
 	 * Controlls all store aktions and triggers the right one
 	 * @controller
 	 */
	StoreClimateData.prototype.storeData = function(mode){
		var deferred = this.AppOptions.q.defer();

		// a new climate dataset will be stored
		if(mode === 'insert'){
			this.insertData().then(function(result){
				deferred.resolve(result);	
			});
		}
		// a existig climate dataset will be changed
		else if (mode === 'patch'){
			if(this.AppOptions._.has(this.AppOptions.reqData,'id')){
				this.patchData().then(function(result){
					deferred.resolve(result);	
				});	
			} else {
				deferred.resolve(false);	
			}
		}
		// a existig climate dataset will be updated
		else if (mode === 'put'){
			if(this.AppOptions._.has(this.AppOptions.reqData,'id')){
				this.updateData().then(function(result){
					deferred.resolve(result);	
				});	
			} else {
				deferred.resolve(false);	
			}
		}
		// a existig climate dataset will be deleted
		else if (mode === 'delete'){

		}
		// nothing is to do
		else {
			deferred.resolve(false);
		}

		return deferred.promise;
	};

	/**
	 * Helper function to set RequestData
	 */
	StoreClimateData.prototype.setRequestData = function(data){
		var rq = {}, url = '';
		if(this.AppOptions._.isNull(data) || this.AppOptions._.isUndefined(data)){
			data = {};
		}
		
		if(this.AppOptions._.has(this.AppOptions.reqData,'id')){
			url = this.AppOptions.config.BaseUrl+
				'/climate/'+
				this.AppOptions.reqData.id+'.json'+
				this.AppOptions.config.Auth;	
		} else {
			url = this.AppOptions.config.BaseUrl+
				'/climate.json'+
				this.AppOptions.config.Auth;
		}
		
		this.AppOptions._.set(rq,'url',url);
		this.AppOptions._.set(rq,'json',true);
		this.AppOptions._.set(rq,'headers',{'content-type': 'application/json'});
		this.AppOptions._.set(rq,'body',data);
		return rq;
	};

	/**
	 * Main function to store new data
	 */
	StoreClimateData.prototype.insertData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this;
		var data = this.preparePostData(this.AppOptions.reqData);
		var url = this.AppOptions.config.BaseUrl+
			'/climate.json'+
			this.AppOptions.config.Auth;

		this.AppOptions.request.post(this.setRequestData(data), function (err, response, body) {
			if(err){ 
				throw err;
			}
			if(_this.AppOptions._.has(body,'name')){
				deferred.resolve({key:body.name});	
			} else {
				deferred.resolve(false);	
			}
		});	
		
		return deferred.promise;
	};

	/**
	 * Main function to patch existing data
	 */
	StoreClimateData.prototype.patchData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this;
		var data = this.preparePatchData(this.AppOptions.reqData);
		
		this.AppOptions.request.patch(this.setRequestData(data), function (err, response, body) {
			if(err){ 
				deferred.resolve(err);		
			} else {
				deferred.resolve(true);	
			}
		});	
		
		return deferred.promise;
	};

	/**
	 * Prepare data for post-modus
	 */
	StoreClimateData.prototype.preparePostData = function(data){
		var _data2store = {};
		
		if(this.AppOptions._.has(data,'timestamp')){
			this.AppOptions._.set(_data2store,'timestamp',new Date(this.AppOptions._.get(data,'timestamp','')));
		}
		else {
			this.AppOptions._.set(_data2store,'timestamp',new Date());
		}
		
		if(this.AppOptions._.has(data,'temperature')){
			this.AppOptions._.set(_data2store,'temperature',this.AppOptions._.get(data,'temperature',0));
		}
		
		if(this.AppOptions._.has(data,'humidity')){
			this.AppOptions._.set(_data2store,'humidity',this.AppOptions._.get(data,'humidity',0));
		}
		
		return _data2store;
	};

	/**
	 * Prepare data for patch-modus
	 */
	StoreClimateData.prototype.preparePatchData = function(data){
		var _data2store = {};

		if(this.AppOptions._.has(data.data,'temperature')){
			this.AppOptions._.set(_data2store,'temperature',this.AppOptions._.get(data.data,'temperature',0));
		}
		
		if(this.AppOptions._.has(data.data,'humidity')){
			this.AppOptions._.set(_data2store,'humidity',this.AppOptions._.get(data.data,'humidity',0));
		}

		if(this.AppOptions._.has(data.data,'timestamp')){
			this.AppOptions._.set(_data2store,'timestamp',new Date(this.AppOptions._.get(data.data,'timestamp',0)));
		}
		else {
			this.AppOptions._.set(_data2store,'timestamp',new Date());	
		}

		return _data2store;
	};

	/**
	 * Main function to update existing data
	 */
	StoreClimateData.prototype.updateData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this;
		var data = this.preparePatchData(this.AppOptions.reqData);
		
		this.AppOptions.request.put(this.setRequestData(data), function (err, response, body) {
			if(err){ 
				throw err;
			}
			deferred.resolve(body);	
		});	
		
		return deferred.promise;
	};
	
	// Export the modul
	module.exports.StoreClimateData = StoreClimateData;
})();