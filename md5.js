var _ = require('underscore');
_.mixin(require('underscore.string').exports());
var crypto = require('crypto');

// log output function
var log = (function(msg){
  var base = new Date().getTime(); // start time
  return function(msg){
    var now = new Date().getTime();
    console.log([msg, ':', now - base, 'msec'].join(''));
    base = now;
  };
})();

// master data
var salt = 'hoge$';
var hash = '4b364677946ccf79f841114e73ccaf4f';
log("inited");

// create input data '000000'-'999999'
var passes = _.map(_.range(0,1000000), function(n){return _.pad(n,6,'0');});
log("created data");

// passes -> hashes(md5)
var hashes = _.map(
        passes, function(src){
          var md5 = crypto.createHash('md5');
          md5.update(salt + src, 'utf8');
          return md5.digest('hex');
        });
log("hashed alldata");

// key:hash value:pass
var dict = _.object(hashes,passes);
log("dicted, pass is " + dict[hash]);
