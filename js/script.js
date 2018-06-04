'use strict';

// getting buttons
var pickStone = document.getElementById('stonePicker');
var pickPaper = document.getElementById('paperPicker');
var pickScissor = document.getElementById('scissorPicker');
var newGameButton = document.getElementById('newGameButton');

// getting main output div
var output = document.getElementById('generalOutput');

// wins counter
var outputCounter = document.getElementById('outputCounter');
var playerCounter = 0;
var computerCounter = 0;

// general rounds counter
var outputRoundCounter = document.getElementById('outputRoundCounter');
var round = 0;

// rounds to end game counter 
var endGameWinsRoundCounter = document.getElementById('outputEndGameRound');
var winsRoundNumber;

// endGame variable
var endGame = true;

// buttons condition function
var disabledButtons = function (value) {
  pickStone.disabled = value; 
  pickPaper.disabled = value; 
  pickScissor.disabled = value;
};
disabledButtons(true);


// output function wins counter
var outputWinsCounter = function () {
  outputCounter.innerHTML = '<header>COUNTER</header>' + playerCounter + ' - ' + computerCounter;
};

// output function rounds
var outputRound = function () {
  outputRoundCounter.innerHTML = '<header>ROUND</header>' + round;
};

// newGame function
var newGame = function () {
  
  if (endGame == true) {
    round = 0;
    playerCounter = 0;
    computerCounter = 0;
    output.innerHTML = '';
    outputWinsCounter();
    outputRound();
  }
  
  // buttons condition
  disabledButtons(false);
  
  // prompt function
  winsRoundNumber = window.prompt ('Enter the end number of  win rounds');
  
  //output function to end game counter rounds
  var outputWinsRoundNumber = function (value) {
    endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + value;
    endGame = false;
    
    if (isNaN(value)) {
      newGame();
    } else if (value == null || value == '' || value == 0 || value < 0) {
      newGame();
    } 
  };
  outputWinsRoundNumber(winsRoundNumber);
};

// playerMove function
var playerMove = function (playerResult) {
  
  // rounds , playerCounter and computerCounter
  if (endGame == false) {
    round++;
  } 
  
  // this function give computer game result
  var computerResult = function () {
    var x = Math.round((Math.random()*2)+1);
    if (x == 1) {
      return 'PAPER';
    } else if (x == 2) {
      return 'STONE';
    } else {
      return 'SCISSOR';
    }
  };
  var pcResult = computerResult();
  
  // this function give general result
  var mainResult = function () {
    if ((playerResult == 'STONE' && pcResult == 'STONE') || (playerResult == 'PAPER' && pcResult == 'PAPER') || (playerResult == 'SCISSOR' && pcResult == 'SCISSOR')) {
      return 'REMIS!: ';
    } else if ((playerResult == 'STONE' && pcResult == 'SCISSOR') || (playerResult == 'PAPER' && pcResult == 'STONE') || (playerResult == 'SCISSOR' && pcResult == 'PAPER')) {
      return 'YOU WIN!: ';  
    } else if ((playerResult == 'STONE' && pcResult == 'PAPER') || (playerResult == 'PAPER' && pcResult == 'SCISSOR') || (playerResult == 'SCISSOR' && pcResult == 'STONE')) {
      return 'YOU LOSS!: ';
    }
  };
  var generalResult = mainResult();
  
  // this function is wins counter mechanism
  var winsCounter = function () {
    if (generalResult == 'YOU WIN!: ' && endGame == false) {
       return playerCounter++;
    } else if (generalResult == 'YOU LOSS!: ' && endGame == false) {
       return computerCounter++;    
    }
  };
  winsCounter();
  
  // output wins and losses function
  outputWinsCounter();
  
  // output round function
  outputRound();

  // this function give content in general output
  var outputMessage = function () {
    if (endGame == false) {
      output.insertAdjacentHTML('afterbegin',generalResult + 'You played ' + playerResult + ' ,computer played ' + pcResult + '<br>');
    } 
  };
  outputMessage();
  
  // this function is mechanism number of win round to end game
  var winEndGameMechanism = function () {
    if ((generalResult == 'YOU WIN!: ') || (generalResult == 'YOU LOSS!: ')) {
      winsRoundNumber--;    
    }
  };
  winEndGameMechanism();
  
  // winner mechanism
  var winnerMechanism = function () {
   if (playerCounter > computerCounter) {
      return 'Player!';
    } else if (playerCounter < computerCounter) {
      return 'Computer!';
    } else if (playerCounter == computerCounter) {
      return 'REMIS!';
    }
  };
  var winner = winnerMechanism();
  
  // output number of win round to end game
  var outputWinsRoundNumber = function() {  
    if (winsRoundNumber > 0) {
       endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + winsRoundNumber;
    } else if (winsRoundNumber == 0) {
      output.insertAdjacentHTML('afterbegin','THE WINNER IS: ' + winner + '<br>');
      endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + 'END GAME';
      endGame = true;
      disabledButtons(true);
    } 
  };
  outputWinsRoundNumber();
};

// listener event on the buttons
var playerMoveClassButtons = document.querySelectorAll('.player-move');
var playerMoveClassLength = playerMoveClassButtons.length;
for (var i = 0; i < playerMoveClassLength; i++) {
    playerMoveClassButtons[i].addEventListener('click', function () {  
        playerMove(this.getAttribute('data-move'));
    });
} 
newGameButton.addEventListener('click',function () { newGame() });
