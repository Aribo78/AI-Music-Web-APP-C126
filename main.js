scoreleftWrist = 0; 
sound1 = "music.mp3"
sound2 = "music2.mp3"
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
song_name = "";

function preload(){
sound1 = loadSound("music.mp3")
sound2 = loadSound("music2.mp3")

}

function setup(){
canvas = createCanvas(600, 500)
canvas.center()

video = createCapture(VIDEO)
video.hide()

poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('PoseNet is Initialized')
}
function draw(){
image(video, 0, 0, 600, 500)
fill("red")
stroke("red")

song_name = sound1.isPlaying();
console.log(sound1);

if(scoreleftWrist > 0.2){
circle(leftWrist_x, leftWrist_y, 20)
sound2.stop();
if(song_name == false){
    sound1.play();
    console.log("Song Name: Track 1");
    document.getElementById("song_id").innerHTML = "Song Name: Track 1";
}
else{
    sound2.play();
    console.log("Song Name: Track 2");
    document.getElementById("song_id").innerHTML = "Song Name: Track 2";
}
}
if(scorerightWrist > 0.2){
    circle(rightWrist_x,rightWrist_y,20);
    sound1.stop();
    if(song_name == true){
        sound2.play();
        console.log("Song Name: Track 2");
    document.getElementById("song_id").innerHTML = "Song Name: Track 2";
    }
    else{
        sound1.play()
        console.log("Song Name: Track 2");
        document.getElementById("song_id").innerHTML = "Song Name: Track 2";
    }
}
}
function play(){
    sound1.play()
    sound2.play()   
}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);

     scoreleftWrist = results[0].pose.keypoints[9].score;
     console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_x = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
    }
