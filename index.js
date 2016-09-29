'use strict';

var assert 	= require('assert');
var Mongo 	= require('mongojs');
var async 	= require('async');
var _ 			= require('lodash');

var BulkMongoDb = function(url, bulk) {
	assert.ok(url, 'please provide a url');
	assert.ok(bulk, 'please provide a bulk dataset');

	bulk.forEach(function(item) {
	  assert.ok(item.collection, 'each bulk dataset should contain a collection name');
		assert.ok(item.documents && item.documents.length > 0, 'each bulk dataset should contain a documents array');
	});

	this.bulk = bulk;
	this.collections = _.flatten(_.pluck(bulk, 'collection'));
  this.db = new Mongo(url, this.collections);
};

BulkMongoDb.prototype.insert = function(done) {
  var _this = this;

  async.eachSeries(this.bulk, function(item, callback) {
  	var bulk = _this.db[item.collection].initializeOrderedBulkOp();

    item.documents.forEach(function(item) {
      if (item._id) { item._id = Mongo.ObjectId(item._id); }
      bulk.insert(item);
    });

    bulk.execute(function(err) {
      callback(err);
    });
	}, function(err) {
	    done(err, 'Import complete.');
	});
};

BulkMongoDb.prototype.drop = function(done) {
	var _this = this;

	if (!this.collections) {
		return;
	}

	async.eachSeries(this.collections, function(collection, callback) {
	  _this.db[collection].drop(function(err){
	    callback(err);
		});
	}, function(err) {
	    done(err, 'Cleanup complete.');
	});
};

module.exports = BulkMongoDb;
