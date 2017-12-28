'use strict'

const limit = require('../rate')
const assert = require('chai').assert

describe('rate limit module', () => {
  describe('"limit"', () => {
    it('should run a callback and return true', function(done){
			const limiter = new limit(1, 1000)
			
			var data = true
      limiter.limit(function(err){
				//if(err){
				if(err)
					data = false
					
				//assert.fail(data, true)
				//}
				//else{
					assert.isTrue(data)
				//}
				done()
			})
      
		});
		
  })
})
