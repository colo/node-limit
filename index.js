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
  get: function(id){
		return this.store.id || false;
	},
	set: function(id, value){
		this.store.id = value;
		return true;
	}
});

module.exports = new Class({
  Implements: [Options, Events],
  
	err: null,
	id: uuidv4(),
	
	options: {
		store: new Memory(),
		limit: 0, //how many are allowed over "interval" space of time
		interval: 0, // limit/interval = rate (milliseconds)
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
  limit: function(callback){
		//const err = null;
		callback.attempt(this.err); 
	}

	
});
