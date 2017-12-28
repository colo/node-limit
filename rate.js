'use strict'


const limit = require('./index')
	
module.exports = new Class({
  Extends: limit,
  
 
	limit: function(callback, key){
		var id = this.options.id
		if(key)
			id += '-'+key
			
		this.options.store.get(id, function(err, last_run){
			last_run = last_run || 0
			this.err = err
			
			const next_allowed = last_run + (this.options.interval / this.options.limit)
			
			if(next_allowed > Date.now())
				this.err = true
				
			//console.log('---last_run---');
			//console.log(id);
			//console.log(last_run)
			//console.log(next_allowed)
			//console.log(Date.now())
			//console.log(this.err)
			//console.log('----------');
			
			this.options.store.set(id, Date.now(), this.parent(callback, key))
		}.bind(this))
		
		
	}
});
