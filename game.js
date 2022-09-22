var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var userChosenColor;
var userClickPattern = [];
var gameStop = 0;
var count = 0;


$(document).keypress(function(){
  if (gamePattern.length < 1)
  {
    gameStop = 0;
    $("body").removeClass("game-over");
    $("#level-title").text("Level 1");
    setTimeout(function () {
      randomChosenColor = nextSequence();
      animating();
      sound(randomChosenColor);
    }, 500);
  }
});

$("h1").click(function(){
  if (gamePattern.length < 1)
  {
    gameStop = 0;
    $("body").removeClass("game-over");
    $("#level-title").text("Level 1");
    setTimeout(function () {
      randomChosenColor = nextSequence();
      animating();
      sound(randomChosenColor);
    }, 500);
  }
});

$(".btn").click(function(){
  if (gamePattern.length >= 1 && gameStop ==0)
  {
    userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    animatePress(userChosenColor);
    sound(userChosenColor);
    if (userClickPattern[count] != gamePattern[count] || userClickPattern.length > gamePattern.length)
    {
      gameOver();
    }
    else{
      count ++;
      if (userClickPattern[gamePattern.length-1] == gamePattern[gamePattern.length-1] )
       {
         userClickPattern = [];
         setTimeout(function () {
           randomChosenColor = nextSequence();
           $("#level-title").text("Level " + gamePattern.length);
           animating();
           sound(randomChosenColor);
         }, 400);
         count = 0;
       }
    }

  }
  else if(gameStop == 1)
  {
    gameOver();
  }

})

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  console.log(gamePattern);
  return randomColor;
}
function animating(){
  $("."+randomChosenColor).hide().fadeIn(50);
}
function sound(color){
  var sound = new Audio("sounds/"+color+".mp3");
  sound.play();
}
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function () {
    $("."+currentColour).removeClass("pressed");
  }, 100);
}
function gameOver(){
  $("body").addClass("game-over");
  sound("wrong");
  gameStop = 1;
  $("#level-title").text("You lose! Press any key to play again.");
  gamePattern = [];
  userClickPattern = [];

}
