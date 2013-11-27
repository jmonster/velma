![logo](https://raw.github.com/jmonster/velma/master/logo.jpg)

## client
An [ES (elasticsearch)](http://www.elasticsearch.org) client is inherently simple thats to the fact that ES exposes a RESTful http interface. This library seeks to streamline and simplify interfacing with ES by lightly abstracting the http layer away and giving some syntactic sugar for various requests such as bulk, search, etc.

## commands
This module has a very shallow learning curve since there are only a handful of commands (get,put,post,delete,search,mapping and bulk). The power, and subsequent learning curve, comes with utilizing [ES's query syntax](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html). I've also found [this blog entry](http://joelabrahamsson.com/elasticsearch-101/) helpful at getting my feet wet with ES.

## examples

```javascript
var Velma = require('velma')
  , velma = new Velma({
              host:'localhost',
              port:9200
            });

// search
velma.search(           {"query":{"match_all": {}}}, function(error,results) { console.log(results); })
velma.search(index,     {"query":{"match_all": {}}}, function(error,results) { console.log(results); })
velma.search(index,type,{"query":{"match_all": {}}}, function(error,results) { console.log(results); })

// get record by id
velma.get('index', 'type', 'id', function(error,results){
  if (error) throw error;
  console.dir(results);
});

// update a record
velma.put('movies', 'movie', 1, { "year":1972 },
  function(error, results) {
    if (error) throw error;
    console.dir(results);
  }
);

// delete a single record
velma.delete('movies', 'movie', 1,
  function(error, results) {
    console.log(results);
  }
);

// bulk delete many records
velma.bulk()
     .delete('movies','movie',3)
     .delete('movies','movie',2)
     .delete('actors','actor','tom-hanks')
     .exec(function(error,results) {
        if (error) throw error;
      });
```
