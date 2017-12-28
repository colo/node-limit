'use strict'


const limit = require('./index')
	
module.exports = new Class({
  Extends: limit,
  
 
	limit: function(callback){
		const last_run = this.store.get(this.id)
		if(last_run)
			
		throw new Error();
		
		this.parent(callback)
		this.store.set(this.id, Date.now())
	}
});
