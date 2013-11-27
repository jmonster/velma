![logo](https://raw.github.com/jmonster/velma/master/logo.jpg)

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
