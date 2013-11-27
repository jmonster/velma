var http = require('http');

module.exports =
function request(opts,done) {
  var req = http.request(opts, function(response) {

    // collect data
    var buf;
    response.on('data', function(chunk) {
      buf = buf ? buf + chunk : chunk;
    });

    // return data to our caller
    response.on('end', function() {
      done && done(null, JSON.parse(buf));
    });
  });

  req.on('error', function(error) {
    done && done(error);
  });

  if (opts.json) {
    req.write(opts.json);
  }

  req.end();

}
