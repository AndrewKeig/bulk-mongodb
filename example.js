'use strict';

var assert        = require('assert');
var BulkMongoDb   = require('./');

describe('notifications', function() {
	var bulkMongoDb;

  before(function(done){
  	var notifications = require('./fixtures/notifications');
  	var users         = require('./fixtures/users');
    
  	var url = 'mongodb://localhost:27017/bulkMongoDbtest';

    var data = [
      { collection : 'notifications', documents : notifications },
      { collection : 'users', documents : users }  
    ];
 
    bulkMongoDb = new BulkMongoDb(url, data);

    bulkMongoDb.insert(function() {
      done();
    });
  });

  after(function(done) {
    bulkMongoDb.drop(function(){
      done();
    });
  });

  describe('when doing something which needs mongodb', function() {
    it('should return a valid response', function(){
    	assert(true);
    });
  });
});