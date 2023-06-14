var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

if(!started){
    $(document).keypress(function(){
        nextSequence();
        started = true; 
    });
}

$(".btn").click(function(e){
    var userChosenColor = e.target.id;
    
    userClickedPattern.push(userChosenColor);
    
    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    
    audio.play();
   
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);    
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random(0,3) * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    //for (var i = 0; i < gamePattern.length; i++){
    //    playTone(i);
    //}
    $.each(gamePattern, function(i, value){
        setTimeout(function(){
            $("#" + value).fadeOut(100).fadeIn(100);
            var audio = new Audio("sounds/" + value + ".mp3");
            audio.play();
        }, 1000 * i);
    });
    
    $("h1").text("Level " + level);

    level++;
    
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);   
}

function checkAnswer(currentLevel){
 if (  gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
     console.log("success");
     
     if (userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
             nextSequence();
         }, 1000);
         
         userClickedPattern = [];
     }
 } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    
    audio.play();
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
 }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}



