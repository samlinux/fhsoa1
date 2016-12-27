/**
 * GetClimateData module
 *
 * @module app/GetClimateData
 * @author rbole <rbole@samlinux.at>
 */
(function(){
	'use strict';

	/**
 	 * Represents a GetClimateData object
 	 * @constructor
 	 */
	var GetClimateData = function(appOptions){
		this.AppOptions = appOptions;
	};	

	/**
 	 * Get all climate datasets
 	 */
	GetClimateData.prototype.getData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this;
		var url = this.AppOptions.config.BaseUrl+
				'/climate.json'+
				this.AppOptions.config.Auth;

		this.AppOptions.request(url, function (err, response, body) {
			if(err){ 
				throw err;
			}
			
			var _data = JSON.parse(response.body);
			var data = [];
			_this.AppOptions._.forEach(_data, function(cData,cKey){
				var cliamte = {};
				_this.AppOptions._.set(cliamte,'id',cKey);
				
				if(_this.AppOptions._.has(cData,'temperature')){
					_this.AppOptions._.set(cliamte,'temperature',_this.AppOptions._.get(cData,'temperature',0));	
				}
				
				if(_this.AppOptions._.has(cData,'humidity')){
					_this.AppOptions._.set(cliamte,'humidity',_this.AppOptions._.get(cData,'humidity',0));
				}	
				
				if(_this.AppOptions._.has(cData,'timestamp')){
					_this.AppOptions._.set(cliamte,'timestamp',_this.AppOptions._.get(cData,'timestamp',0));
				}

				data.push(cliamte);
			});
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	module.exports.GetClimateData = GetClimateData;
})();
