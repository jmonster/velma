![logo](https://raw.github.com/jmonster/velma/master/logo.jpg)

## examples

```javascript
var Velma = require('velma');
var velma = new Velma({host:'localhost',port:9200});

// get by id
velma.get('index', 'type', 'id', function(error,response,body){
  if (error) throw error;
  console.dir(body);
});

// update a record
velma.put('movies', 'movie', 1, {"year":1972},
  function(error,response,body) {
    if (error) throw error;
    console.dir(body);
  }
);

// delet a single record
velma.delete('movies', 'movie', 1,
  function(error, response, body) {
    console.log(r,b);
  }
);

// bulk delete many records
velma.bulk()
     .delete('movies','movie',3)
     .delete('movies','movie',2)
     .delete('actors','actor','tom-hanks')
     .exec(function(error,response,body) {
        if (error) throw error;
      });
```
