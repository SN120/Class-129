song = "";

left_WristY = "";
right_WristY = "";
left_WristX = "";
right_WristX = "";
score_l = "";

volume = 1;
rate = 1;

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 450);

    fill('#FF0000');
    stroke('#FF0000');

    circle(left_WristX, left_WristY, 10);



    if (score_l > 0.2) {

        fill('#0044ff');
        stroke('#0044ff');

        circle(right_WristX, right_WristY, 10);

        volume = left_WristY / 50;
        song.setVolume(volume / 10);
        document.getElementById("vol").innerHTML = floor(volume);
        document.getElementById("myRange").value = volume;
    }

}

function preload() {
    song = loadSound('music.mp3')
}

function play() {
    song.play();
    song.setVolume(volume / 10);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        left_WristY = results[0].pose.leftWrist.y;
        right_WristY = results[0].pose.rightWrist.y;

        sore_l = results[0].pose.keypoints[9].score;

        left_WristX = results[0].pose.leftWrist.x;
        right_WristX = results[0].pose.rightWrist.x;

        // console.log("Left = "+leftWrist);
        // console.log('Right = '+rightWrist);
    }
}

// function changeVolume(){
//     volume = document.getElementById("myRange").value;
//     song.setVolume(volume/10);
//     document.getElementById("vol").innerHTML = volume;
// }
// function changeRate(){
//     rate =document.getElementById("myRange2").value;
//     song.rate(rate/10);
//     document.getElementById("speed").innerHTML = rate/10;
// }