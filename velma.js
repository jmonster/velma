var request = require('./lib/request')
  , Bulk    = require('./lib/bulk')
  ;

// Velma
var Velma = module.exports =
  function(serverOpts) {
    this.host = serverOpts.host;
    this.port = serverOpts.port;
    return this;
  }

// Instance Methods
Velma.prototype.get = function(idx, type, id, ret) {
  return this.request('get', idx, type, id, null, ret);
}

Velma.prototype.put = function(idx, type, id, body, ret) {
  return this.request('put', idx, type, id, body, ret);
}

Velma.prototype.post = function(idx, type, id, body, ret) {
  return this.request('post', idx, type, id, body, ret);
}

Velma.prototype.delete = function(idx, type, id, ret) {
  return this.request('delete', idx, type, id, null, ret);
}

Velma.prototype.request = function(method, idx, type, id, body, ret) {
  path = [idx,type,id].join('/')

  var httpOptions = {
    path:     path,
    hostname: this.host,
    port:     this.port,
    method:   method
  };

  // PUT + POST
  if (body) {
    var json            = JSON.stringify(body);
    httpOptions.json    = json;
    httpOptions.headers = {
      'Content-Type':'application/json',
      'Content-Length':json.length
    };
  }

  // DELETE
  if (method === 'delete') {
    httpOptions.json = '';
  }

  request(httpOptions, ret);
};

Velma.prototype.search = function(query,ret) {
  var httpOptions = {
    path:     '/_search',
    hostname: this.host,
    port:     this.port,
    method:   'post'
  };

  var json            = JSON.stringify(query);
  httpOptions.json    = json;
  httpOptions.headers = {
    'Content-Type':'application/json',
    'Content-Length':json.length
  };

  return request(httpOptions, ret);
};

Velma.prototype.mapping = function(idx, type, properties, ret) {
  path = [idx,type,'_mapping'].join('/');

  var httpOptions = {
    path:     path,
    hostname: this.host,
    port:     this.port,
    method:   'put'
  };

  var json            = JSON.stringify(properties);
  httpOptions.json    = json;
  httpOptions.headers = {
    'Content-Type':'application/json',
    'Content-Length':json.length
  };

  return request(httpOptions, ret);
};

Velma.prototype.bulk = function() {
  return new Bulk(this);
};
