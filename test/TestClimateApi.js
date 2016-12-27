/**
 * Climate REST API tests
 */
(function(){
	'use strict';
	var chai = require('chai');
	var supertest = require('supertest'),
	api = supertest('http://localhost:3000'),
	should = chai.should(),
	expect = chai.expect;

	describe('Climate API', function(){

		it('GET / There is more than one dataset', function(done){
			//this.skip();
			api.get('/')
				.expect(200)
				.end(function(err,res){
				
				if(err){ 
					throw err; 
				}
			
                res.body.data.should.be.a('array');

				done();  
			});
		});
		
		it('GET /:id Get dataset for given Id', function(done){
			//this.skip();
			var id = '-KZzuR2F2_5H8jCCmUW9';
			api.get('/'+id)
				.expect(200)
				.end(function(err,res){
				
				if(err){ 
					throw err; 
				}
			
               	res.body.data.should.have.property('humidity');
           		res.body.data.should.have.property('temperature');
           		res.body.data.should.have.property('timestamp');

				done();  
			});
		});

		it('POST / Insert one new dataset', function(done){
			//this.skip();
			var data = null,
				payload = {
					'temperature':23,
					'humidity':40
				};

				api.post('/')
					.expect(200)
					.send(payload)
					.end(function(err,res){
					
					if(err){ 
						throw err; 
					}
					
					res.body.should.have.property('key');
					done();
				});
			});

		it('PATCH / Insert one dataset und patch this', function(done){
			//this.skip();
			var data = null,
				payload = {
					'temperature':23,
					'humidity':40
				};

				api.post('/')
					.expect(200)
					.send(payload)
					.end(function(err,res){
					
					if(err){ 
						throw err; 
					}
					
					payload = {
						'id':res.body.key,
						'data': {
							'temperature':100,
							'humidity':100	
						}
					};
					api.patch('/')
						.expect(200)
						.send(payload)
						.end(function(err,res){
						
						if(err){ 
							throw err; 
						}
						
						res.body.should.be.true;
						done();
					});
				});
			});
		
		it('PUT / Insert one dataset und pull this', function(done){
			//this.skip();
			var data = null,
				payload = {
					'temperature':2,
					'humidity':2
				};

				api.post('/')
					.expect(200)
					.send(payload)
					.end(function(err,res){
					
					if(err){ 
						throw err; 
					}
					
					payload = {
						'id':res.body.key,
						'data': {
							'temperature':102
						}
					};
					api.put('/')
						.expect(200)
						.send(payload)
						.end(function(err,res){
						
						if(err){ 
							throw err; 
						}
						
						res.body.data.should.have.property('temperature');
						expect(res.body.data.temperature).to.equal(102);
						
						done();
					});
				});
			});

		it('DELETE / Insert one dataset und delete this', function(done){
			//this.skip();
			var data = null,
				payload = {
					'temperature':1,
					'humidity':1
				};

				api.post('/')
					.expect(200)
					.send(payload)
					.end(function(err,res){
					
					if(err){ 
						throw err; 
					}
					//console.log(res.body.key);
					payload = {
						'id':res.body.key
					};
					api.delete('/')
						.expect(200)
						.send(payload)
						.end(function(err,res){
						
						if(err){ 
							throw err; 
						}

						res.body.data.should.be.true;
						done();
					});
				});
			});

	});
})();		
		