
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern = [];
var level=0;
var flag=false;
$(document).keypress(function(){
    if(!flag){
        $("#level-title").text("Level " + level);
        nextSequence();
        flag=true;
    }   
});
$(".btn").click(function(event){
    var userChosenColour=event.target.id;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   setTimeout(function(){$("#"+userChosenColour).removeClass("pressed")},100);
   checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
}
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level "+ level);
    

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
 

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){ 
                nextSequence();
            },100);
        }
    }
    else{
        var abc=new Audio("sounds/wrong.mp3");
        abc.play();
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press Any Key to Start")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();


    }
}
function startOver(){
    level=0;
    gamePattern=[];
    flag=false;
}