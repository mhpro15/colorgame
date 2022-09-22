var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //color that have been shown
var randomChosenColor; // color that will be generated
var userChosenColor; //color that user clicked
var userClickPattern = []; //user clicked pattern
var gameStop = 0; //keep the game load correctly
var count = 0; //update the number of color in sequence

// event to take keyboard press and start or reset the game
$(document).keypress(function(){
  if (gamePattern.length < 1)
  {
    gameStop = 0;
    $("body").removeClass("game-over");   //if reset
    $("#level-title").text("Level 1");
    setTimeout(function () {
      randomChosenColor = nextSequence();
      animating();
      sound(randomChosenColor);
    }, 500);
  }
});
// also start or reset but click on h1 title
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

//instruction hide / appear
$("dialog").hide();
$(".closeInstruction").click(function(){
  $("dialog").fadeOut();
});
$(".instruction").click(function(){
  $("dialog").fadeIn();
});


//event when click on button
$(".btn").click(function(){
  if (gamePattern.length >= 1 && gameStop ==0)
  {
    userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    animatePress(userChosenColor);
    sound(userChosenColor);
    // game over when user pick the wrong color compare with the game pattern
    if (userClickPattern[count] != gamePattern[count] || userClickPattern.length > gamePattern.length)
    {
      gameOver();
    }
    //game continue to generate new color if the last element of user sequence is correct,
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

//function to generate new color
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  console.log(gamePattern);
  return randomColor;
}
//function to animate flash button
function animating(){
  $("."+randomChosenColor).hide().fadeIn(50);
}
//function to play sound
function sound(color){
  var sound = new Audio("sounds/"+color+".mp3");
  sound.play();
}
//function of animation when click button
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function () {
    $("."+currentColour).removeClass("pressed");
  }, 100);
}

//function when user lose, reset
function gameOver(){
  $("body").addClass("game-over");
  sound("wrong");
  gameStop = 1;
  $("#level-title").text("You lose! Press any key to play again.");
  gamePattern = [];
  userClickPattern = [];

}
