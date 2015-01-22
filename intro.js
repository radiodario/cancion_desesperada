
var width = 50
var t = 0;


randomchars = "   .-   　゜　,　　　,　。　.　　　＋　　゜　　　。　　。゜　.　゜。,　☆　*　。゜.　o.゜　　。　.　。。　.　　．。　　　　o　　　．.　。　゜　 ゜　,　。.　o　。*　。　.　o．　。　．　.　　　　　。　　　.　　　。　　．　.゜o　。　*．　。　．.　☆　.　＋.　.　　.　。　.　　．　.　　　.　　　．　　。　゜。,　☆　゜.　＋　。　゜　,。　.　。　　,　.。'"


function addRandomCharTo(str) {
  return str + randomchars[Math.random() * (randomchars.length - 1)| 0];
}

function getRandomChar() {
  return randomchars[Math.random() * (randomchars.length - 1)| 0];
}

function drawit(lines) {

  var a = 0;


  while (a < lines) {
    var str = "";
    var pos = 25 + (Math.sin(440 * t) * 25 | 0);
    var i = 0;
    while (i < pos) {
      var char = getRandomChar();
      str += char
      process.stdout.write(char);
      i++
    }
    str += "*";
    process.stdout.write("*")
    while (str.length < width) {
      var char = getRandomChar()
      process.stdout.write(char);
      str += char;
    }

    process.stdout.write('\n');

    t++
    a++
  }


}

module.exports = {
  addRandomChar : addRandomCharTo,
  getRandomChar : getRandomChar,
  draw: drawit
}
