// if ($(document).keypress()==true)

var gamePattern =[];
var userClickPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColor)
    animatePress(randomChosenColor);
}
$(".btn").click(function(event){
    // console.log(event.target);
    var str = event.target;
    var id = ($(str).attr("id"));
    handler(id);
    playSound(id);
    animatePress(id);
})
// nextSequence();
function handler(id){
    var userChosenColor = id; 
    userClickPattern.push(userChosenColor);
    checkAnswer(userClickPattern.length-1);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
  
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        // console.log("success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(nextSequence(),1000);
        }
    }
  
    else{
    //   console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
    // nextSequence();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}