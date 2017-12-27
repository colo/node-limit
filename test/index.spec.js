'use strict'

const limit = require('../index')
const assert = require('chai').assert

describe('limit module', () => {
  describe('"initialize"', () => {
    it('should instantiate', () => {
			const limiter = new limit()
      assert.typeOf(limiter, 'object')
    })
    
    it('should have default options', () => {
			const limiter = new limit()
      assert.isObject(limiter.options)
    })
    
    it('check options type', () => {
			const limiter = new limit()
			
			Object.each(limiter.options, function(value, opt){
				//console.log(value);
				//if(opt == 'nodelay'){
					//assert.typeOf(value, 'boolean')
				//}
				//else{
					assert.isNumber(value)
				//}
			})
      
    })
    
    it('should modify options', () => {
			const options = {
				limit: 1,
				interval: 1000
			};
  
			const limiter = new limit(options)
			
      Object.each(limiter.options, function(value, opt){
				assert.equal(value, options[opt])
			})
    })
    
  })
  
  describe('"limit"', () => {
		it('should be a function', () => {
			const limiter = new limit()
      assert.isFunction(limiter.limit)
    })
    
    //https://gist.github.com/eswak/c54989f05c6f2ce4be00
    //https://stackoverflow.com/questions/11235815/is-there-a-way-to-get-chai-working-with-asynchronous-mocha-tests
    
	})
})
