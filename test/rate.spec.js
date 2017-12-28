'use strict'

const limit = require('../rate')
const assert = require('chai').assert

describe('rate limit module', () => {
	
  describe('"limit"', () => {
    it('should run a callback with err = null', function(done){
			const limiter = new limit()
			
			limiter.limit(function(err){
				assert.equal(err, null)
				done()
			})
      
		});
		
		it('should run a callback twice, first with no err, then err=true', function(done){
			this.timeout(0)
			
			const options = {
				limit: 1,
				interval: 1000,
			};
			
			const limiter = new limit(options)
			
			var counter = 0
			var expected = []
			var interval = setInterval(function(){
				counter++
				
				limiter.limit(function(err){
					
					expected.push(err)
					
				})
			
				if(counter > 1){
					clearInterval(interval)
					assert.deepEqual(expected,[null, true]);
				}
					
			}, 500);
			
			setTimeout(done, 2000);
      
      
		});
		
		it('should run a 2 callbacks, both err=null', function(done){
			this.timeout(0)
			
			const options = {
				limit: 1,
				interval: 1000,
			};
			
			const limiter = new limit(options)
			
			var expected = []
			
      
      limiter.limit(function(err){
				expected.push(err)
			}, 'test1')
			
			limiter.limit(function(err){
				expected.push(err)
			}, 'test2')
				
      assert.deepEqual(expected,[null, null]);
      
      setTimeout(done, 2000);
		});
		
		it('should run 2 limits on one callback', function(done){
			this.timeout(0)
			
			//should allow 4 callbacks in 2 secs, right?
			const rate_opts = {
				id: 'callback_per_sec',
				limit: 1,
				interval: 500,
			};
			
			//no, we restrict it to 2/2secs
			const max_opts = {
				id: 'max_callbacks',
				limit: 2,
				interval: 2000,
			};
			
			const rate = new limit(rate_opts)
			const max = new limit(max_opts)
			
			max.limit(
				rate.limit(
					function(err){
						assert.equal(err, null)
						done()
					}
				)
			)
      
		});
		
		it('should run 2 limits on one callback, and fail on "max"', function(done){
			this.timeout(0)
			
			//should allow 4 callbacks in 2 secs, right?
			const rate_opts = {
				id: 'callback_per_sec',
				limit: 1,
				interval: 500,
			};
			
			//no, we restrict it to 2/2secs
			const max_opts = {
				id: 'max_callbacks',
				limit: 2,
				interval: 2000,
			};
			
			const rate = new limit(rate_opts)
			const max = new limit(max_opts)
			
			var counter = 0
			var expected = []
			var interval = setInterval(function(){
				counter++
				
				max.limit(
					function(err){
						//console.log('----max.limit---')
						//console.log(err)
						expected.push(err)
						
						rate.limit(function(err){
							//console.log('----rate.limit---')
							//console.log(err)
							
							expected.push(err)
						})
						
						
						
					}
				)
			
				if(counter > 3){
					clearInterval(interval)
					assert.deepEqual(expected,[null, null, true, null, true, null, true, null]);
				}
					
			}, 600);
			
			setTimeout(done, 3000);
			
		});
		
  })
})
