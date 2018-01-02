'use strict'


const limit = require('../rate')
	
module.exports = new Class({
  Extends: limit,
  
  options: {
		//https://www.fullcontact.com/developer/docs/rate-limits/
		//https://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers
		headers: {
			'X-Rate-Limit-Limit': function(id, header, res){
				res.append(header, this.options.limit +'/'+this.options.interval);
			}, //
			'X-Rate-Limit-Remaining': function(key, header, res){
				var id = this.options.id
				if(key)
					id += '-'+key
					
				console.log('---X-Rate-Limit-Remaining---'+id);
				this.options.store.get(id, function(err, data){
					//console.log('--get--');
					//console.log(data);
					const clean_data = { index: 0, end: Date.now() + this.options.interval };
					data = data || clean_data;
					//console.log(data);
					var remaining = 0;
					
					if(data.end < Date.now()){//limit period ended, reset
						remaining = this.options.limit - 1;
					}
					else{
						remaining = ( this.options.limit - ( data.index + 1 ) > 0 ) ? this.options.limit - ( data.index + 1 ) : 0;
					}
					
					res.append(header, remaining);
					//console.log('--get--');
				}.bind(this))
			}, //
			'X-Rate-Limit-Reset': function(key, header, res){
				var id = this.options.id
				if(key)
					id += '-'+key;
					
				//console.log('---X-Rate-Limit-Reset---'+id);
				this.options.store.get(id, function(err, data){
					//console.log('--get--');
					//console.log(data);
					var clean_data = { index: 0, end: Date.now() + this.options.interval };
					data = data || clean_data;
					
					var end = data.end;
					if(end < Date.now()){//limit period ended, reset
						end = Date.now() + this.options.interval;
					}
					
					res.append(header, end);
				}.bind(this))
			},//
		},
		
		status: 429,
		
		/**
		 * you may set a function to run
		 * @default null (will call 'next')
		 * */
		//response: null,
		response: function(e, req, res, next){ res.json({error: e.message})}
	},
	
	limit: function(req, res, next, key){
		
		
		try{
			this.set_headers(res, key);//always set headers, to notify there is a rate limit in place
			this.parent(next, key);
		}
		catch(e){
			//console.log(e)
			if(this.options.status)//modify status if there is we reach the limit
				res.status(this.options.status)
				
			//this.set_headers(res, key);//always set headers, to notify there is a rate limit in place
			
			if(typeof(this.options.response) == 'function'){
				this.options.response(e, req, res, next)
			}
			else{
				next();
			}
			
		}
		
		//if(this.error == true){
			//this.response(res)
		//}
	},
	initialize: function(options){
		//this.addEvent(this.ON_ERROR, this.response);
		this.setOptions(options);
	},
  ip: function(){
		return function (req, res, next) {
			//this.set_headers(res, req.ip);//always set headers, to notify there is a rate limit in place
			
			this.limit(req, res, next, req.ip)
		}.bind(this);
  },
  user: function(){
		return function (req, res, next) {
			//console.log('---user---')
			//console.log(req.user.username)
			//this.set_headers(res, req.user.username);//always set headers, to notify there is a rate limit in place
			
			this.limit(req, res, next, req.user.username)
		}.bind(this);
  },
  set_headers: function (res, key){
		console.log('---RESPONSE----');
		
		Object.each(this.options.headers, function (value, header){
			if(typeof(value) == 'function'){
				//res.append(header, value.attempt(key, this));
				value.attempt([key, header, res], this);
			}
			else{
				res.append(header, value);
			}
		}.bind(this));
		
		//res.status(this.options.status)
		//res.json({ error: this.message });
	}
	
});
