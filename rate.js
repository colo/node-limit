'use strict'


const limit = require('./index')
	
module.exports = new Class({
  Extends: limit,
  
  options: {
		message: 'Rate limit exceeded',
	},
	
	limit: function(callback, key){
		var id = this.options.id
		if(key)
			id += '-'+key
			
		this.options.store.get(id, function(err, data){
			const clean_data = { index: 0, end: Date.now() + this.options.interval }
			data = data || clean_data
			//this.error = err
			
			console.log('---last_run---');
			console.log(id);
			console.log(data)
			console.log(Date.now())
			//console.log(next_allowed)
			
			//console.log(this.err)
			
			if(data.end < Date.now()){//limit period ended, reset
				console.log('---RESETING----')
				this.error = false;
				//this.options.store.delete(id)
				clean_data.index++
				this.options.store.set(id,clean_data,this.parent(callback))
			}
			else{
				data.index++
				
				if(data.index > this.options.limit){
					this.error = true
				}
				else{
					this.error = false;
				}
				
				this.options.store.set(id,data,this.parent(callback))
				
			}
			//const next_allowed = last_run + (this.options.interval / this.options.limit)
			
			//if(next_allowed > Date.now()){
				//this.err = true
				//this.fireEvent(this.ON_ERROR);
			//}
				
				
			
			//console.log('----------');
			
			
				
		}.bind(this))
		
		
	},
	initialize: function(options){
		this.setOptions(options);//override default options
  },
});
