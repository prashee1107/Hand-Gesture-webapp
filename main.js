https://teachablemachine.withgoogle.com/models/IBcYLA3S8/
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90  
  });
  camera= document.getElementById("camera");
  Webcam.attach(camera);

  
  function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    });
 }
 console.log("ml5 version", ml5.version);
 classifer = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IBcYLA3S8/model.json",modelLoaded);

 function modelLoaded(){
   console.log("Model Loaded!")
}

function speak(){
  var synth = window.speechSynthesis;
  var speak_data = "The gesture is "+prediction;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}

function identify(){
  image = document.getElementById("captured_image");
  classifer.classify(image,gotResult);
}
function gotResult(error,results){
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    document.getElementById("result_text").innerHTML= results[0].label;
    if(results[0].label =="Best" ){
      document.getElementById("result_icon").innerHTML = "&#128077;";
      prediction= results[0].label;
      speak();
    }
   else if(results[0].label== "Amazing"){
    document.getElementById("result_icon").innerHTML="&#128076;";
    prediction= results[0].label;
      speak();
   }
   else if(results[0].label=="Victory"){
    document.getElementById("result_icon").innerHTML="&#9996;";
    prediction= results[0].label;
      speak();
   }
  }
    
}