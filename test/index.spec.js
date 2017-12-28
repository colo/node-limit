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
				if(opt == 'id'){
					assert.isString(Function.attempt(value))
				}
				else{
					assert.isNumber(value)
				}
			})
      
    })
    
    it('should modify options', () => {
			const options = {
				limit: 1,
				interval: 1000,
				id: function(){ return 'test' }
			};
  
			const limiter = new limit(options)
			
      Object.each(limiter.options, function(value, opt){
				assert.equal(value, options[opt])
			})
    })
    
    it('should modify id option with another function', () => {
			const req = { user: 'test' }
			const limiter = new limit({
				id: function(req){
					return req.user
				}
			})
			
			assert.equal(limiter.options.id.attempt(req), 'test')
      
    })
    
    
  })
  
  describe('"limit"', () => {
		it('should be a function', () => {
			const limiter = new limit()
      assert.isFunction(limiter.limit)
    })
    
    // first test
		it('should run a callback and return true', function(done){
			const limiter = new limit()
			var data = true
      limiter.limit(function(){
				assert.isTrue(data)
				done()
			})
      
			//myAsyncFunction(function(data) { // callback
				//// test stuff
				//// the 3 assertions are doing the same thing,
				//// it's just 3 different ways to write it
				
				
				//assert.equal(data, 'hello');
				//data.should.equal('hello');
				//expect(data).to.eql('hello');
				//// this test is done, go to the next one
				////done();
			//});
		});
  
    //https://gist.github.com/eswak/c54989f05c6f2ce4be00
    //https://stackoverflow.com/questions/11235815/is-there-a-way-to-get-chai-working-with-asynchronous-mocha-tests
    
	})
})
