'use strict';

// getting buttons
var pickStone = document.getElementById('stonePicker');
var pickPaper = document.getElementById('paperPicker');
var pickScissor = document.getElementById('scissorPicker');
var playerMoveClassButtons = document.querySelectorAll('.player-move');
var playerMoveClassLength = playerMoveClassButtons.length;
var newGameButton = document.getElementById('newGameButton');

// getting main output div
var output = document.getElementById('generalOutput');
// match result counter
var outputCounter = document.getElementById('outputCounter');
// rounds counter
var outputRoundCounter = document.getElementById('outputRoundCounter');
// rounds to end game counter 
var endGameWinsRoundCounter = document.getElementById('outputEndGameRound');

// object with global variables
var params = {
    playerCounter: 0,
    computerCounter: 0,
    round: 0,
    winsRoundNumber: 0,
    endGame: true,
    progress: []
};

// buttons condition function
var disabledButtons = function(value) {
    pickStone.disabled = value; 
    pickPaper.disabled = value; 
    pickScissor.disabled = value;
};
disabledButtons(true);

var outputWinsCounter = function() {
    outputCounter.innerHTML = '<header>COUNTER</header>' + params.playerCounter + ' - ' + params.computerCounter;
};

var outputRound = function() {
    outputRoundCounter.innerHTML = '<header>ROUND</header>' + params.round;
};

// start newGame function
var newGame = function() {
  
    if (params.endGame == true) {
        params.round = 0;
        params.playerCounter = 0;
        params.computerCounter = 0;
        params.progress = [];
        output.innerHTML = '';
        outputWinsCounter();
        outputRound();
    }
    document.querySelectorAll('td').forEach(function(e){e.remove()});
    disabledButtons(false);
  
    params.winsRoundNumber = window.prompt('Enter the end number of  win rounds');
  
    //output function to end game counter rounds
    var outputWinsRoundNumber = function(value) {
        endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + value;
        params.endGame = false;
        if (isNaN(value)) {
            newGame();
        } else if (value === null || value === '' || value === 0 || value < 0) {
            newGame();
        } 
    };
    outputWinsRoundNumber(params.winsRoundNumber);
};  

// this table build tr in tbody table
var buildTable = function() {
    var tbody = document.querySelector('tbody');
    
    params.progress.forEach(function(progressResult) {
        var row = document.createElement('tr');
        tbody.appendChild(row);
        for (var key in progressResult) {
            buildTableTd(progressResult[key], row);
        }
    })
};

// this function build td in table
var buildTableTd = function(value, row) {
    var td = document.createElement('td');
    td.innerHTML = value;
    row.appendChild(td);
};

var runModal = function(winner) {
    
    var modalOne = document.querySelector('.modal');
    var modalOneContent = modalOne.querySelector('p');
     
    // show modal function
    var showModal = function() {
		document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('.modal').classList.add('show');
	};
    showModal();
    
	var finallResult = function(winner) {
        modalOneContent.innerHTML = 'THE WINNER IS: ' + winner + '<br>';
        buildTable();

    };
    finallResult(winner);

    // close click
    var hideModal = function(event) {
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	}
    
    // close click overlay
    document.querySelector('#modal-overlay').addEventListener('click', hideModal);
    
    // stop close modal click inside them
    var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++) {
		modals[i].addEventListener('click', function (event) {
			event.stopPropagation();
		});
	}
};

var playerMove = function(playerResult) {
    
    // rounds counter
    if (params.endGame === false) {
        params.round++;
    } 
  
    // computer result pick
    var computerResult = function() {
        var x = Math.round((Math.random()*2)+1);
        if (x === 1) {
            return 'PAPER';
        } else if (x === 2) {
            return 'STONE';
        } else {
            return 'SCISSOR';
        }
    };
    var pcResult = computerResult();
  
    // this function give general result
    var mainResult = function() {
        if ((playerResult === 'STONE' && pcResult === 'STONE') || (playerResult === 'PAPER' && pcResult === 'PAPER') || (playerResult === 'SCISSOR' && pcResult === 'SCISSOR')) {
            return 'REMIS!: ';
        } else if ((playerResult === 'STONE' && pcResult === 'SCISSOR') || (playerResult === 'PAPER' && pcResult === 'STONE') || (playerResult === 'SCISSOR' && pcResult === 'PAPER')) {
            return 'YOU WIN!: ';  
        } else if ((playerResult === 'STONE' && pcResult === 'PAPER') || (playerResult === 'PAPER' && pcResult === 'SCISSOR') || (playerResult === 'SCISSOR' && pcResult === 'STONE')) {
            return 'YOU LOSS!: ';
        }
    };
    var generalResult = mainResult();
  
    var winsCounter = function() {
        if (generalResult === 'YOU WIN!: ' && params.endGame === false) {
            return params.playerCounter++;
        } else if (generalResult === 'YOU LOSS!: ' && params.endGame === false) {
            return params.computerCounter++;    
        }
    };
    winsCounter();
   
    outputWinsCounter();
  
    outputRound();

    // general output
    var outputMessage = function() {
        if (params.endGame === false) {
            output.insertAdjacentHTML('afterbegin',generalResult + 'You played ' + playerResult + ' ,computer played ' + pcResult + '<br>');
        } 
    };
    outputMessage();
  
    // this function is mechanism number of win round to end game
    var winEndGameMechanism = function() {
        if ((generalResult === 'YOU WIN!: ') || (generalResult === 'YOU LOSS!: ')) {
            params.winsRoundNumber--;    
        }
    };
    winEndGameMechanism();
    
    var winnerMechanism = function() {
        if (params.playerCounter > params.computerCounter) {
            return 'Player!';
        } else if (params.playerCounter < params.computerCounter) {
            return 'Computer!';
        } else if (params.playerCounter === params.computerCounter) {
            return 'REMIS!';
        }
    };
    var winner = winnerMechanism();
 
    // this object return to params.progress actuall result the game
    var object = {
        MatchRounds: params.round,
        MatchPlayerResult: playerResult,
        MatchComputerResult: pcResult,
        FinallyResult: params.playerCounter + ' - ' + params.computerCounter
    };
    params.progress.push(object);
  
    var outputWinsRoundNumber = function() {  
        if (params.winsRoundNumber > 0) {
            endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + params.winsRoundNumber;
        } else if (params.winsRoundNumber === 0) {  
        endGameWinsRoundCounter.innerHTML = '<header>END GAME ROUND</header>' + 'END GAME';     
        disabledButtons(true);
        runModal(winner);
        params.endGame = true;
        } 
    };
    outputWinsRoundNumber();
};

// listener event to click the buttons
for (var i = 0; i < playerMoveClassLength; i++) {
    playerMoveClassButtons[i].addEventListener('click', function () {  
        playerMove(this.getAttribute('data-move'));
    });
} 
newGameButton.addEventListener('click',function() { newGame() });
