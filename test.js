'use strict';

var assert        = require('assert');
var BulkMongoDb   = require('./');

describe('BulkMongoDb', function() {
  var bulkMongoDb;
  var notifications = require('./fixtures/notifications');
  var users         = require('./fixtures/users');

  describe('when creating an invalid BulkMongoDb with missing url', function() {

    it('should throw error', function() {

      var url = '';

      var data = [
        { collection : 'notifications', documents : notifications },
        { collection : 'users', documents : notifications }  
      ];

      try {
        bulkMongoDb = new BulkMongoDb(url, data);
      } catch (ex) {
        assert.equal(ex, 'AssertionError: please provide a url');
      }
    });
  });

  describe('when creating an invalid BulkMongoDb with missing collection', function() {

    it('should throw error', function() {

      var url = 'mongodb://localhost:27017/bulkMongoDbtest';

      var data = null;

      try {
        bulkMongoDb = new BulkMongoDb(url, data);
      } catch (ex) {
        assert.equal(ex, 'AssertionError: please provide a bulk dataset');
      }
    });
  });

  describe('when creating an invalid BulkMongoDb with missing documents', function() {

    it('should throw error', function() {

      var url = 'mongodb://localhost:27017/bulkMongoDbtest';

      var data = [
        { collection : 'notifications', documents : null },
        { collection : 'users', documents : users }  
      ];

      try {
        bulkMongoDb = new BulkMongoDb(url, data);
      } catch (ex) {
        assert.equal(ex, 'AssertionError: each bulk dataset should contain a documents array');
      }
    });
  });

  describe('when creating an invalid BulkMongoDb with missing collection name', function() {

    it('should throw error', function() {

      var url = 'mongodb://localhost:27017/bulkMongoDbtest';

      var data = [
        { collection : '', documents : notifications },
        { collection : 'users', documents : users }  
      ];

      try {
        bulkMongoDb = new BulkMongoDb(url, data);
      } catch (ex) {
        assert.equal(ex, 'AssertionError: each bulk dataset should contain a collection name');
      }
    });
  });

  describe('when creating an valid BulkMongoDb', function() {

    it('should insert data', function() {

      var url = 'mongodb://localhost:27017/bulkMongoDbtest';

      var data = [
        { collection : 'notifications', documents : notifications },
        { collection : 'users', documents : users }  
      ];
   
      bulkMongoDb = new BulkMongoDb(url, data);
        assert.equal(bulkMongoDb.bulk, data);
        assert.equal(bulkMongoDb.collections.length, 2);
        assert.equal(bulkMongoDb.collections[0], 'notifications');
        assert.equal(bulkMongoDb.collections[1], 'users');
    });
  });

  describe('when populating mongodb with valid dataset', function() {

    it('should insert data', function(done) {

      var url = 'mongodb://localhost:27017/bulkMongoDbtest';

      var data = [
        { collection : 'notifications', documents : notifications },
        { collection : 'users', documents : users }  
      ];
   
      bulkMongoDb = new BulkMongoDb(url, data);

      bulkMongoDb.insert(function(err, status) {
        assert.equal(err, null);
        assert.equal(status, 'Import complete.');
        done();
      });
    });
  });

  describe('when dropping mongodb collection', function() {

    it('should drop data', function(done) {

      var url = 'mongodb://localhost:27017/bulkMongoDb';

      var data = [
        { collection : 'notifications', documents : notifications },
        { collection : 'users', documents : users }  
      ];
   
      bulkMongoDb = new BulkMongoDb(url, data);

      bulkMongoDb.insert(function() {
        
        bulkMongoDb.drop(function(err, status) {
          assert.equal(err, null);
          assert.equal(status, 'Cleanup complete.');
          done();
        });
        
        done();
      });
    });
  });
});
