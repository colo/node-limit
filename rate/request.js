'use strict'


const limit = require('../rate')
	
module.exports = new Class({
  Extends: limit,
  
	options: {
		//https://www.fullcontact.com/developer/docs/rate-limits/
		//https://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers
		headers: {
			'X-Rate-Limit-Limit': 0,
			'X-Rate-Limit-Remaining': 0,
			'X-Rate-Limit-Reset': 0,
		},
		
		status: 429,
	},
	
	limit: function(req, res, next, key){
		this.parent(next, key);
		
		if(this.err)
			this.response(res)
	},
	initialize: function(options){
		//this.addEvent(this.ON_ERROR, this.response);
		this.setOptions(options);
	},
  ip: function(){
		return function (req, res, next) {
			this.limit(req, res, next, req.ip)
		}.bind(this);
  },
  user: function(){
		return function (req, res, next) {
			this.limit(req, res, next, req.user)
		}.bind(this);
  },
  response: function (res){
		console.log('---RESPONSE----');
		
		Object.each(this.options.headers, function (value, header){
			res.append(header, value);
		}.bind(this));
		
		res.status(this.options.status)
	}
	
});
