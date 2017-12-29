'use strict'

require("mootools");

const uuidv4 = require('uuid/v4');

var Memory = new Class({
  Implements: [Options, Events],
	
	store: {},
	
	options: {
	},
	
	initialize: function(options){
		this.setOptions(options);//override default options
  },
  get: function(key, callback){
		callback(null, this.store[key])
	},
	set: function(key, value, callback){
		this.store[key] = value;
		
		if(callback)
			callback(null, value, key)
	},
	delete: function(key, callback){
		const value = this.store[key]
		delete this.store[key];
		
		if(callback)
			callback(null, value, key)
	},
	clear: function(callback){
		this.store = {};
		if(callback)
			callback(null)
	},
	each: function(callback){
		Object.each(this.store, function(value, key){
			callback(value, key)
		}.bind(this))
	},
	
});

module.exports = new Class({
  Implements: [Options, Events],
  
  ON_ERROR: 'onError',
  
	err: null,
	
	options: {
		store: new Memory(),
		limit: 0, //how many are allowed over "interval" space of time
		interval: 0, // limit/interval = rate (milliseconds)
		id: uuidv4(),
		//id: function(){
			//return ''
		//},
		/*burst: 0, //how many are queued before being dropped
		max: -1, //max
		ttl: -1,//countdown to reset this limit (milliseconds)
		nodelay: false //to-do: a la Nginx?*/
  },
  initialize: function(options){
		//if(options){
			//Object.each(options, function(value, opt){
				//if(typeOf(value) == 'function')
					//options[opt] = value.attempt();
			//});
		//}
		
		
		this.setOptions(options);//override default options
  },
  limit: function(callback, key){
		//const err = null;
		callback(this.err); 
	}

	
});
