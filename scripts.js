/*for digital clock type font (orbitron)
<link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'> */


var sessionLength = 0;//set by User
var breakLength = 0;//set by User

var sessionStart = false;
var breakStart = false;

var timerSeconds = 0;
var timerMinutes = 0;

var sessionTimer;//sets timer as global variable
var breakTimer;
//var progressTimer;
var percentage;
var progressBarWidth = 0;
var progressCount = 0;

function playBeep() {
    document.getElementById('beep').play();
};

function stopTimer(id){
	clearInterval(id);
};


function timer() {

  if (progressCount == percentage){
  	console.log("increase bar");
    progressBarWidth++;
    document.getElementById("progress-bar").style.width = progressBarWidth + "%";
    
    if (progressBarWidth == 100){
    	console.log("progress complete");
    };
    
    progressCount = 1;
  }else{
  	progressCount++;
  };	
	
	//console.log("seconds: " + seconds);
  //console.log("minutes: " + minutes);
  var tempMin = 0;
  var tempSec = 0;
  
	if (timerMinutes==0 && timerSeconds == 0){//if timer ends
  	console.log("00:00");
    console.log("FINISHED");
    document.getElementById("time-display").innerHTML = "00:00";
    playBeep();
    
    if (sessionStart){//if session timer ended, start break timer
    	sessionStart = false;
    	breakStart = true;
      progressBarWidth = 0;
      progressCount = 0;
      document.getElementById("progress-bar").style.backgroundColor = "green";
    	console.log("starting break timer");
      //playBeep();
      stopTimer(sessionTimer);//stops session timer
      timerMinutes = breakLength;
      percentage = (timerMinutes * 60)* 0.01;
			breakTimer = setInterval(timer, 1000);
		}else{//break timer ends, function finished
    	console.log("break over");
      breakStart = false;
      progressBarWidth = 0;
      progressCount = 0;
      playBeep();
      stopTimer(breakTimer);//stops break timer
    };
    
  }else{//proceed with countdown
  	if (timerMinutes>0 && timerSeconds < 0){
    	timerMinutes--;
      timerSeconds = 59;
    };
    
    //Displays current time
    if (timerMinutes.toString().length==2){
    	tempMin = timerMinutes;
    }else{
    	tempMin = "0" + timerMinutes;
    };
    
    if (timerSeconds.toString().length==2){
    	//console.log(minutes + ":" + seconds);
      tempSec = timerSeconds;
    }else{
  		//console.log(minutes + ":0" + seconds);
    	tempSec = "0" + timerSeconds;
  	};
    
    var tempDisplay = tempMin + ":" + tempSec;
    console.log(tempDisplay);
    document.getElementById("time-display").innerHTML = tempDisplay;
    
  	timerSeconds--;
  };
}


$(document).ready(function(){
	$("#session-time").text(sessionLength);
	$("#break-time").text(breakLength);

	$(".button").mousedown(function(){
    $(this).addClass("clicked");
    $(this).mouseup(function(){
      $(this).removeClass("clicked");
    });
  });
  
  $("#session-up").click(function(){
  	if (sessionLength<90){
    	sessionLength += 5;
    };
    $("#session-time").text(sessionLength);
  });
  $("#session-down").click(function(){
  	if (sessionLength >0){
    	sessionLength -= 5;
    };
    $("#session-time").text(sessionLength);
  });
  
  $("#break-up").click(function(){
  	if (breakLength<90){
    	breakLength += 5;
    };
    $("#break-time").text(breakLength);
  });
  $("#break-down").click(function(){
  	if (breakLength >0){
    	breakLength -= 5;
    };
    $("#break-time").text(breakLength);
  });
  
  $("#start-button").click(function(){
  	if (sessionStart == false && breakStart){
    	//Start disabled; do nothing.
    }else if (sessionStart && breakStart == false){
    	//Start disabled; do nothing.
    }else if (sessionStart == false && breakStart == false){
      console.log("starting");
      sessionStart = true;
      timerMinutes = sessionLength;
      sessionTimer = setInterval(timer, 1000);
      percentage = (timerMinutes * 60)* 0.01;
      $("#progress-bar").css("backgroundColor", "red");
    };
  })
  
  $("#stop-button").click(function(){
  	console.log("Stopping");
    if (sessionStart){
    	sessionStart = false;
    	stopTimer(sessionTimer);
    }else if (breakStart){
    	breakStart = false;
    	stopTimer(breakTimer);
    };
    
    progressBarWidth = 0;
    progressCount = 0;
    timerSeconds = 0;
    $("#progress-bar").css("width", "0");
  });

	

});
