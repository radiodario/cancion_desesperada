var fs = require('fs');
var natural = require('natural');
var silabador = require('./silabas');
var text = fs.readFileSync('text.txt', 'utf-8');
var data = [];
var async = require('async')

var tokenizer = new natural.AggressiveTokenizerEs();

function process(text) {

  // the text is split in sets of two verses
  var stanzas = text.split('\n\n');

  async.map(stanzas, processStanza, function(err, results) {
    fs.writeFileSync('poem.json', JSON.stringify({ poem: results }, null, " "));
  })

}


function processStanza(stanza, callback) {

  var verses = stanza.split('\n');

  return async.map(verses, processVerse, function(err, results) {
    verselist = [];

    verses.map(function(v, i) {
      verselist.push({
        v: v,
        w: results[i]
      });
    })

    callback(err, verselist)

  });

}


function processVerse(verse, callback) {

  var words = tokenizer.tokenize(verse);


  async.map(words, silabador, function(err, results) {
    wordlist = [];

    words.map(function(w, i) {
      wordlist.push({
        w: w,
        s: results[i]
      });
    })
    callback(err, wordlist);
  });

}



process(text);


