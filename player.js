var midi = require('midi'),
  midiOut = new midi.output();

beatOut = new midi.output();


var spawn = require('child_process').spawn;
vis = spawn(__dirname + '/run_visuals.sh');


// gibber runs terribly on node.js - use midi
// AudioContext = require('web-audio-api').AudioContext;
// Gibber = require('./node_modules/gibber.audio.lib/build/gibber.audio.lib');
// Gibber.init();

var deaccent = require('diacritics').remove;

// var synth = Mono('dark');

try {
  midiOut.openPort(0);
  beatOut.openPort(1);
} catch(error) {
  midiOut.openVirtualPort('');
}

var intro = require('./intro');

var BPM = 240;

var poem = require('./poem').poem

var noteDuration = 1000;

var notes = {
    // C:  60,
    // Cs: 61,
    // D:  62,
    // Ds: 63,
    // E:  64,
    // F:  65,
    // Fs: 66,
    // G:  67,
    // Gs: 68,
    // A:  69,
    // As: 70,
    // B:  71
    C:  24,
    Cs: 25,
    Db: 25,
    D:  26,
    Ds: 27,
    Eb: 27,
    E:  28,
    F:  29,
    Fs: 30,
    Gb: 30,
    G:  31,
    Gs: 32,
    Ab: 32,
    A:  33,
    As: 34,
    Bb: 34,
    B:  35
};


var scale = [
  "C",
  // "Cs", //
  "D",
  // "Ds", //
  "E",
  "F",
  // "Fs", //
  "G",
  // "Gs", //
  "A",
  "Bb",
  // "B" //
];



var stanza = -10;
var verse = 0;
var word = 0;
var syllable = 0;



function chooseOctave(syllable) {
  return (Math.random() * 10 | 0) - 2;
}

function chooseNote(syllable) {
  var octave = chooseOctave(syllable);

  var noteName = scale[Math.random() * (scale.length - 1) | 0] ;

  var note = (notes[noteName] + (octave * 12));

  // if it's a tonic syllable then emphasize otherwise play soft
  var velocity = (syllable.toUpperCase() === syllable) ? 120 : 80;
  process.stdout.write("\033[30m" + noteName + octave + "\033[0m");
  return [note, velocity, noteName+octave];

}


function printSyllable(syllable) {
  process.stdout.write("\033[33m" + syllable + "\033[0m");
}

var beatMod = 0;

function drums() {
  ++beatMod;

  if (beatMod === 0 || (beatMod % 4) === 0) {
    playBeat(36, 60 + ((Math.random() * 60) | 0));
  }

  if ((beatMod % 8) === 0) {
    playBeat(37, 60 + ((Math.random() * 60) | 0));
  }

  if ((beatMod % 16) === 0) {
    playBeat(38, 60 + ((Math.random() * 60) | 0));
  }

  if ((beatMod % 16) === 2) {
    playBeat(39, 60 + ((Math.random() * 60) | 0));
  }

  playBeat(42, 40 + ((Math.random() * 60) | 0))

  if (beatMod === 32) {
    beatMod = 0;
  }

}

function playBeat(note, vel) {

  beatOut.sendMessage([144, note, vel]);
  setTimeout(function() {
    beatOut.sendMessage([128, note, vel]);
  }, 500);
}


function playNote(note) {


  // synth.note(note[2]);

  midiOut.sendMessage([144, note[0], note[1]]);
  setTimeout(function() {
    midiOut.sendMessage([128, note[0], note[1]]);
  }, noteDuration + Math.random() * 1000 | 0);

}

// every 64 beats increase the stanza
// and reset all the counters
function stepStanza() {
  stanza++;
  verse = 0;
  intro.draw(1);
  var len = 0;
  while (len < 10) {
    process.stdout.write(intro.getRandomChar());
    len++
  }
}


// every 32 beats increase the verse
function stepVerse() {
  verse++;
  word = 0;
  beatMod = 0;
  process.stdout.write("\n");
  var len = 0;
  while (len < 10) {
    process.stdout.write(intro.getRandomChar());
    len++
  }
}

// every 16 beats increase the word
function stepWord() {
  word++;
  syllable = 0;
  process.stdout.write(" ");
}

// every beat play a syllable
function stepSyllable() {
  drums();
  try {
    var s = poem[stanza];

    var v = s[verse];
    if (!v) {
      stepStanza();
      return stepSyllable();
    }
    var w = v.w[word];
    if (!w) {
      stepVerse();
      return stepSyllable();
    }
    var sb = w.s[syllable];
    if (!sb) {
      stepWord();
      return stepSyllable();
    }

    printSyllable(sb);

    var note = chooseNote(sb);
    playNote(note);
    sock.write(deaccent(sb));
    syllable++

  } catch (e) {
    stepStanza();
    intro.draw(1);
  }
}

// *sockets stuff
var net = require('net');

var sock;
var server = net.createServer(function function_name (connection) {
  console.log('visuals connected');
  sock = connection;
  sock.on('end', function() {
    console.log('visuals disconnected');
  })

  setInterval(stepSyllable, 1000/(BPM/60));

});

server.listen(5204, function() { //'listening' listener
  console.log('server on');
});





