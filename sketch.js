let video;

let handPose;
let connections;
let poses= [];
let lastParticleTime = 0; // Timer for controlling particle emission
let hands = [];
let emitters = [];
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;

let audioPlayer;


function preload() {
  handPose = ml5.handPose();
  img1 = loadImage('/image/1.png');
  img2 = loadImage('/image/2.png');
  img3 = loadImage('/image/3.png');
  img4 = loadImage('/image/4.png');
  img5 = loadImage('/image/5.png');
  img6 = loadImage('/image/6.png');
  img7 = loadImage('/image/7.png');
  img8 = loadImage('/image/8.png');
  img9 = loadImage('/image/9.png');
  img10 = loadImage('/image/10.png');
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}
function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(720, 480);
  video = createCapture(VIDEO);
  video.size(720, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  for (let i = 0; i < 21 * 2; i++) {
    emitters.push(new Emitter(width / 2, height / 2));
  }
  background(0);
}

function draw() {
  clear();
  image(video, 0, 0);
  blendMode(ADD);
  let currentTime = millis(); // Current time in milliseconds
  if (hands.length > 0) {
    let counter = 0;
    for (let hand of hands) {
      for (let i = 0; i < hand.keypoints.length; i++) {
      
        if (i == 10){
            let keypoint = hand.keypoints[i];
            let emitter = emitters[counter];
            emitter.origin.x = keypoint.x;
            emitter.origin.y = keypoint.y;
            image(img2, keypoint.x, keypoint.y, 80, 80);
            if (currentTime - lastParticleTime > 100) {
                emitter.addParticle();
                lastParticleTime = currentTime; // Reset timer
          }
        } 
        }
    }
  }
  
  for (let emitter of emitters) {
    emitter.run();
  }
}
