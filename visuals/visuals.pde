import processing.net.*;
Client myClient;

String syllable;

int size = 100;
int messageLength = 0;

void setup() {
  size(600, 600);
  // Connect to the local machine at port 5204.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1", 5204);
  PFont technic = createFont("technic", 126);
  textFont(technic);
  textSize(126);
  textAlign(CENTER, CENTER);
  text("!@#$%", width/2, height/2);
  background(0);
}

void draw() {
  fill(0, 3);
  rect(0, 0, width, height);



  messageLength = myClient.available();



  if (messageLength > 0) {
    syllable = myClient.readString();
    fill(messageLength*200, 20, 200);
    text(syllable, width/2 + random(-width/2, width/2), height/2 + random(-height/2, height/2));
  }



}