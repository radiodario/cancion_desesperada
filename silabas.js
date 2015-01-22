var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://localhost:4242");

module.exports = function(word, callback) {
  client.invoke("process", word, function(error, res, more) {
    callback(error, res);
  });
};