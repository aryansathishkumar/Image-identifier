Webcam.set
({
    width:350,
    height:300,
    image_format:"png",
    png_format:90
});
var camera = document.getElementById("camera-display");
Webcam.attach(camera);

function capture()
{
    Webcam.snap(function (data_uri)
    {
        document.getElementById("captured").innerHTML = '<img id="snapped" src="'+data_uri+'">';
    })
}

console.log("ml5.version",ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/k6cmXe2bP/model.json",loaded);

function loaded()
{
    console.log("ml5 loaded");
}

function identify()
{
    var img = document.getElementById("snapped");
    classifier.classify(img, next)
}
function  next(error, results)
{
    if(error)
    {
        console.error(error)
        var synthesis = window.speechSynthesis;
        var spoken_data = "There is an error occured. please try again";
        var utter = new SpeechSynthesisUtterance(spoken_data);
        synthesis.speak(utter);
    }
    else
    {
        console.log(results)
        document.getElementById("object_found").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2)*100 + "%";
    }
}
