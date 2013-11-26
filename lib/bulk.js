var request = require('./request');

// Bulk
var Bulk = module.exports =
function Bulk(velma) {
  this.velma = velma;
  this.lines = [];
  return this;
};

// Instance Methods
Bulk.prototype.__updateValues = function(method, idx, type, id, fields) {
  var obj     = {};
  obj[method] = {
    "_index":idx,
    "_type":type,
    "_id":id
  };

  this.lines.push(JSON.stringify(obj));
  if (fields) this.lines.push(JSON.stringify(fields));

  return this;
};

Bulk.prototype.index = function(idx, type, id, fields) {
  return this.__updateValues('index', idx, type, id, fields);
};

Bulk.prototype.create = function(idx, type, id, fields) {
  return this.__updateValues('create', idx, type, id, fields);
};

Bulk.prototype.update = function(idx, type, id, fields) {
  return this.__updateValues('update', idx, type, id, fields);
};

Bulk.prototype.delete = function(idx, type, id) {
  return this.__updateValues('delete', idx, type, id);
};

Bulk.prototype.exec = function(ret) {
  var body = this.lines.join('\n') + '\n'; // must end with a new line
  var httpOptions = {
    path:     '/_bulk',
    hostname: this.velma.host,
    port:     this.velma.port,
    method:   'post'
  };

  httpOptions.json    = body;
  httpOptions.headers = {
    'Content-Type':'text/plain',
    'Content-Length':body.length
  };

  request(httpOptions, ret);
};
