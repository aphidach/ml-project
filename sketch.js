let video;

let handPose;
let connections;
let bodyPose;
let poses= [];
let lastParticleTime = 0; // Timer for controlling particle emission
let hands = [];
let emitters = [];
let img;
function preload() {
  handPose = ml5.handPose();
  bodyPose = ml5.bodyPose();
  img = loadImage('box.png');
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
  createCanvas(1920, 1080);
  video = createCapture(VIDEO);
  video.size(1280, 720);
  video.hide();
  // bodyPose.detectStart(video, gotPoses);
  handPose.detectStart(video, gotHands);
  for (let i = 0; i < 21 * 2; i++) {
    emitters.push(new Emitter(width / 2, height / 2));
  }
  background(0);
  connections = bodyPose.getConnections();
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
        if (i == 12){
            let keypoint = hand.keypoints[i];
            let emitter = emitters[counter];
            emitter.origin.x = keypoint.x;
            emitter.origin.y = keypoint.y;
            image(img, keypoint.x, keypoint.y, 50, 50);
            if (currentTime - lastParticleTime > 50) {
                emitter.addParticle();
                lastParticleTime = currentTime; // Reset timer
          }
        } 
        }
    }
  }
// Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        // line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  const counter = 0;
  // for (let i = 0; i < poses.length; i++) {
  //   let pose = poses[i];
    
  //   for (let j = 0; j < pose.keypoints.length; j++) {
  //       let keypoint = pose.keypoints[j];
  //     // Only draw a circle if the keypoint's confidence is bigger than 0.1
  //     if (keypoint.confidence > 0.1) {
  //       fill(0, 255, 0);
  //       noStroke();
  //       circle(keypoint.x, keypoint.y, 10);
  //       if (j == 10 || j == 9){
  //           let emitter = emitters[counter];
  //           emitter.origin.x = keypoint.x;
  //           emitter.origin.y = keypoint.y;
  //        if (currentTime - lastParticleTime > 500) {
  //               emitter.addParticle();
  //               lastParticleTime = currentTime; // Reset timer
  //         }
  //       }
  //     }
  //   }
  // }
  for (let emitter of emitters) {
    emitter.run();
  }
}
