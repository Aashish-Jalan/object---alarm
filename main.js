img = "";
status = "";
objects = [];
song = "";

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video  = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
 
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw()
{
    image(video , 0 , 0 , 380 , 380);
 
   if(status != "")
    {

        objectDetector.detect(video , gotResult);
      for (i  = 0 ; i< objects.length; i++)
      {
        if(objects[i].label == "person")
        {
            document.getElementById("status").innerHTML = "Person Detected";
            song.stop()
        }
        else
        {
            document.getElementById("status").innerHTML = "Person is not Detected";
            song.play();
        }
       if(objects[i].length < 0 )
       {
        document.getElementById("status").innerHTML = "Person is not Detected";
            song.play();
       }
      }
    }
}
