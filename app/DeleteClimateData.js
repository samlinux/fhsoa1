/**
 * DeleteClimateData module
 *
 * @module app/DeleteClimateData
 * @author rbole <rbole@samlinux.at>
 */
(function(){
	'use strict';
	/**
 	 * Represents a DeleteClimateData object
 	 * @constructor
 	 */
	var DeleteClimateData = function(appOptions){
		this.AppOptions = appOptions;
	};	

	/**
 	 * Main function to delete the one dataset for a given ID
 	 * @returns {boolean} true if the given dataset is deleted or false if not
 	 */
	DeleteClimateData.prototype.deleteData = function(){
		var deferred = this.AppOptions.q.defer();
		var _this = this, url = '';
	
		if(this.AppOptions._.has(this.AppOptions.reqData,'id')){
			var data = {};
			this.AppOptions._.set(data,'id',this.AppOptions.reqData.id);

			url = this.AppOptions.config.BaseUrl+
				'/climate/'+
				this.AppOptions.reqData.id+'.json'+
				this.AppOptions.config.Auth;

			var reqObject = {};
			this.AppOptions._.set(reqObject,'url',url);
			this.AppOptions._.set(reqObject,'json',true);
			this.AppOptions._.set(reqObject,'headers',{'content-type': 'application/json'});
			this.AppOptions._.set(reqObject,'body',data);

			this.AppOptions.request.delete(reqObject, function (err, response, body) {
				if(err){ 
					deferred.resolve(false);
				}
				else {
					deferred.resolve(true);		
				}
			});		
		}
		else {
			deferred.resolve(false);	
		}

		return deferred.promise;
	};

	// export the modul
	module.exports.DeleteClimateData = DeleteClimateData;
})();
