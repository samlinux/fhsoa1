/**
 * GetClimateDetailData module
 *
 * @module app/GetClimateDetailData
 * @author rbole <rbole@samlinux.at>
 */
(function(){
	'use strict';

	/**
 	 * Represents a GetClimateData object
 	 * @constructor
 	 */
	var GetClimateDetailData = function(appOptions){
		this.AppOptions = appOptions;
	};	

	/**
 	 * Get one climate dataset for a given ID
 	 * @returns {object} if dataset exists otherwise false
 	 */
	GetClimateDetailData.prototype.getDetailData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this, url = '';

		if(this.AppOptions._.has(this.AppOptions.reqParams,'id')){
			var data = {};
			this.AppOptions._.set(data,'id',this.AppOptions.reqParams.id);

			url = this.AppOptions.config.BaseUrl+
				'/climate/'+
				this.AppOptions.reqParams.id+'.json'+
				this.AppOptions.config.Auth;
			
			var reqObject = {};
			this.AppOptions._.set(reqObject,'url',url);
			this.AppOptions._.set(reqObject,'json',true);
			this.AppOptions._.set(reqObject,'headers',{'content-type': 'application/json'});

			this.AppOptions.request(reqObject, function (err, response, body) {
				if(err){ 
					deferred.resolve(false);
				}
				else {
					deferred.resolve(body);		
				}
			});		
		}
		else {
			deferred.resolve(false);	
		}
		return deferred.promise;
	};

	// export the modul
	module.exports.GetClimateDetailData = GetClimateDetailData;
})();