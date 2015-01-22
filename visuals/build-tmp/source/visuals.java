import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import processing.net.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class visuals extends PApplet {


Client myClient;

String syllable;

int size = 100;
int messageLength = 0;

public void setup() {
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

public void draw() {
  fill(0, 3);
  rect(0, 0, width, height);



  messageLength = myClient.available();



  if (messageLength > 0) {
    syllable = myClient.readString();
    fill(messageLength*200, 20, 200);
    text(syllable, width/2 + random(-width/2, width/2), height/2 + random(-height/2, height/2));
  }



}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "visuals" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
