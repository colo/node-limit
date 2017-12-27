'use strict'

require("mootools");
	
module.exports = new Class({
  Implements: [Options, Events],
  
 
	options: {
		limit: 0, //how many are allowed over "interval" space of time
		interval: 0, // limit/interval = rate (milliseconds)
		/*burst: 0, //how many are queued before being dropped
		max: -1, //max
		ttl: -1,//countdown to reset this limit (milliseconds)
		nodelay: false //to-do: a la Nginx?*/
  },
  initialize: function(options){
		this.setOptions(options);//override default options
  },
  limit: function(callback){
		callback()
	}

	
});
