bulk-mongodb
==================

bulk-mongodb is a utility to assist integration testing, it simply bulk inserts documents into collections, and allows you to drop them.

[![build status](https://travis-ci.org/AndrewKeig/bulk-mongodb.svg)](http://travis-ci.org/AndrewKeig/bulk-mongodb)

## Install

```sh
$ npm install bulk-mongodb --save-dev
```


## Setup
Consider the following test, the `before` block, setups a data set with an array of things to import. We create a `BulkMongoDb`, passing in a mongodb `url`, and the data set.  we then execute `bulkMongoDb.insert`, which runs the bulk insert.  The `after` block cleans this up by dropping the collections we added.

```javascript
'use strict';

var assert        = require('assert');
var BulkMongoDb   = require('./');

describe('notifications', function() {
  var bulkMongoDb;

  before(function(done){
    var notifications = require('./fixtures/notifications');
    var users         = require('./fixtures/users');
    
    var url = 'mongodb://localhost:27017/bulkMongoDbtest'

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
```


## Fixtures
The fixture used in the above example.

```json
[
  { "title" : "notification one", "status" : "active"   },
  { "title" : "notification two", "status" : "active"   },
  { "title" : "notification three", "status" : "active" },
  { "title" : "notification four", "status" : "active"  },
  { "title" : "notification five", "status" : "deleted" }
]
```

## Test

```sh
$ npm test
```

## License

This work is licensed under the MIT License (see the LICENSE file).

https://github.com/AndrewKeig/bulk-mongodb/blob/master/LICENSE