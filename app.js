// Define  HTML elemnts
const intro = document.getElementById('intro');
const playerOneNameInput = document.getElementById('player_one_name_input');
const playerTowNameInput = document.getElementById('player_tow_name_input');
const stratGamtBTN = document.getElementById('start_game');
const pauseGameBTN = document.getElementById('pause_game');
const pauseGameCover = document.getElementById('pause_game_cover');
const gameScreen = document.getElementById('game_screen');
const gameOverCover = document.getElementById('game_over_cover');
const playerWin = document.getElementById('player_win');
const restartGameBTN = document.getElementById('restart_game');
const playerOneScoreDisplay = document.getElementById('player_one_score');
const playerTowScoreDisplay = document.getElementById('player_tow_score');
const PlayerOneNameDisplay = document.getElementById('player_one_name');
const PlayerTowNameDisplay = document.getElementById('player_tow_name');
const playerOneAnswerCorrectCountDisplay = document.getElementById('count_answer_correct_player_one');
const playerTowAnswerCorrectCountDisplay = document.getElementById('count_answer_correct_player_tow');
const playerOneAnswerWrongCountDisplay = document.getElementById('count_answer_wrong_player_one');
const playerTowAnswerWrongCountDisplay = document.getElementById('count_answer_wrong_player_tow');
const questionText = document.getElementById('question_text');
const answerTextA = document.getElementById('answer_text_a');
const answerTextB = document.getElementById('answer_text_b');
const answerTextC = document.getElementById('answer_text_c');
const answerTextD = document.getElementById('answer_text_d');
const playerOneNowPlay = document.getElementById('player_one_now_play');
const playerTowNowPlay = document.getElementById('player_tow_now_play');
const playerOneDisabled = document.getElementById('player_one_disabled');
const playerTowDisabled = document.getElementById('player_tow_disabled');
const questionTimer = document.getElementById('question_timer');
const counterQuestion = document.getElementById('counter_question');
// Define some constants 
let playerOneScore = 0;
let playerTowScore = 0;
let playerOneAnswerCorrectCount = 0;
let playerTowAnswerCorrectCount = 0;
let playerOneAnswerWrongCount = 0;
let playerTowAnswerWrongCount = 0;
let lastQuestion;
let randomQuestion;
let playerOne = false;
let playerTow = false;
let TIMER = -1;
let count = 0;
const quesTIME = 30;
const introSound = new Audio();
const correctAnswerSound = new Audio();
const wrongAnswerSound = new Audio();
const timeOutAnswer = new Audio();
const clapSound = new Audio();
// set sounds file directories 
introSound.src = 'intro.mp3';
correctAnswerSound.src = 'correct.mp3';
wrongAnswerSound.src = 'wrong.mp3';
timeOutAnswer.src = 'time-out.mp3';
clapSound.src = 'clap.mp3';
correctAnswerSound.volume = 0.1;
wrongAnswerSound.volume = 0.1;
timeOutAnswer.volume = 0.1;

// Start game
function startGame() {
	setPlayersName();
	intro.style.display = 'none';
	gameScreen.style.display = 'block';
	gameScreen.classList.add('lightSpeedIn');
	// player one has now answer
	playerOne = true;
	
	setTimeOut(() => {
		displayQuestions();
	},1500);
	
	// Start background music
	introSound.play();
	introSound.volume = 0.1;
	// Loop background music
	introSound.loop = true;
	
}
// Set Players Name
function setPlayersName() {
	if (playerOneNameInput.value != '' && playerTowNameInput.value !='' ) {
		PlayerOneNameDisplay.innerHTML = playerOneNameInput.value;
		PlayerTowNameDisplay.innerHTML = playerTowNameInput.value;	
		console.clear();	
	}else {
		playerOneNameInput.classList.add('heartBeat');
		playerTowNameInput.classList.add('heartBeat');
		setTimeout(function(){
		playerOneNameInput.classList.remove('heartBeat');
		playerTowNameInput.classList.remove('heartBeat');
		},300);
		throw new Error();
	}

}
// Display Questions
function displayQuestions() {
	// get random question
	randomQuestion = Math.floor(Math.random() * questions.length);
	// save in new variable
	lastQuestion = questions[randomQuestion];

	// render question
	questionText.innerHTML = lastQuestion.Question;
	answerTextA.innerHTML = lastQuestion.AnswerOne;
	answerTextB.innerHTML = lastQuestion.AnswerTwo;
	answerTextC.innerHTML = lastQuestion.AnswerThree;
	answerTextD.innerHTML = lastQuestion.AnswerFour;
	shuffleAnswers();
	TIMER = setInterval(startTimer, 1000);
}
// Shuffle Answers
function shuffleAnswers() {
	var answers = document.querySelector('.shuffle_this');
	for (var i = answers.children.length; i >= 0; i--) {
		answers.appendChild(answers.children[Math.random() * i | 0]);
	};
}
// Start Timer
function startTimer() {
	if (count <= quesTIME) {
		counterQuestion.innerHTML = count;
		questionTimer.style.width = 100 / quesTIME * count + '%';
		count++
	} else {
		timeOutAnswer.play();
		moveQuestionToNextPlayer();
	}
}
// Cheack Answer
function cheackAnswer(x) {
	if (lastQuestion.CorrectAnswer === x && playerOne === true) {
		playerOne = false;
		playerTow = true;
		asnwerCorrect('playerOne');
	} else if (lastQuestion.CorrectAnswer !== x && playerOne === true) {
		playerOne = false;
		playerTow = true;
		asnwerWrong('playerOne');
	} else if (lastQuestion.CorrectAnswer === x && playerTow === true) {
		playerOne = true;
		playerTow = false;
		asnwerCorrect('playerTow');
	} else if (lastQuestion.CorrectAnswer !== x && playerTow === true) {
		playerOne = true;
		playerTow = false;
		asnwerWrong('playerTow');
	}
}
// Answer Correct
function asnwerCorrect(player) {
	// remove random question
	questions.splice(randomQuestion, 1);
	switch (player) {
		case 'playerOne': playerOneDisabled
			playerOneNowPlay.classList.remove('player_board_active','lightSpeedIn');
			playerTowNowPlay.classList.add('player_board_active','lightSpeedIn');
			playerOneDisabled.classList.add('player_board_disabled');
			playerTowDisabled.classList.remove('player_board_disabled');			
			updateScores('playerOne', true);
			updateAnswersCounters('playerOne', true);
			count = 0;
			clearInterval(TIMER);
			correctAnswerSound.play();
			setTimeout(() => {
				questionText.innerHTML = '&nbsp;';
				answerTextA.innerHTML = '&nbsp;';
				answerTextB.innerHTML = '&nbsp;';
				answerTextC.innerHTML = '&nbsp;';
				answerTextD.innerHTML = '&nbsp;';
				questionText.classList.add('bounceOut');
				answerTextA.classList.add('bounceOut');
				answerTextB.classList.add('bounceOut');
				answerTextC.classList.add('bounceOut');
				answerTextD.classList.add('bounceOut');
			}, 300);
			setTimeout(() => {
				displayQuestions();
				questionText.classList.remove('bounceOut');
				answerTextA.classList.remove('bounceOut');
				answerTextB.classList.remove('bounceOut');
				answerTextC.classList.remove('bounceOut');
				answerTextD.classList.remove('bounceOut');
			}, 2000);
			break;
		case 'playerTow':
			playerOneNowPlay.classList.add('player_board_active','lightSpeedIn');
			playerTowNowPlay.classList.remove('player_board_active','lightSpeedIn');
			playerOneDisabled.classList.remove('player_board_disabled');
			playerTowDisabled.classList.add('player_board_disabled');
			updateScores('playerTow', true);
			updateAnswersCounters('playerTow', true);
			count = 0;
			clearInterval(TIMER);
			correctAnswerSound.play();
			setTimeout(() => {
				questionText.innerHTML = '&nbsp;';
				answerTextA.innerHTML = '&nbsp;';
				answerTextB.innerHTML = '&nbsp;';
				answerTextC.innerHTML = '&nbsp;';
				answerTextD.innerHTML = '&nbsp;';
				questionText.classList.add('bounceOut');
				answerTextA.classList.add('bounceOut');
				answerTextB.classList.add('bounceOut');
				answerTextC.classList.add('bounceOut');
				answerTextD.classList.add('bounceOut');
			}, 300);
			setTimeout(() => {
				displayQuestions();
				questionText.classList.remove('bounceOut');
				answerTextA.classList.remove('bounceOut');
				answerTextB.classList.remove('bounceOut');
				answerTextC.classList.remove('bounceOut');
				answerTextD.classList.remove('bounceOut');
			}, 2000);
			break;
	}
}
// Answer Wrong
function asnwerWrong(player) {
	switch (player) {
		case 'playerOne':
			playerOneNowPlay.classList.remove('player_board_active','lightSpeedIn');
			playerTowNowPlay.classList.add('player_board_active','lightSpeedIn');
			playerOneDisabled.classList.add('player_board_disabled');
			playerTowDisabled.classList.remove('player_board_disabled');
			updateScores('playerOne', false);
			updateAnswersCounters('playerOne', false);
			count = 0;
			clearInterval(TIMER);
			wrongAnswerSound.play();
			TIMER = setInterval(startTimer, 1000);
			break;
		case 'playerTow':
			playerOneNowPlay.classList.add('player_board_active','lightSpeedIn');
			playerTowNowPlay.classList.remove('player_board_active','lightSpeedIn');
			playerOneDisabled.classList.remove('player_board_disabled');
			playerTowDisabled.classList.add('player_board_disabled');
			count = 0;
			clearInterval(TIMER);
			wrongAnswerSound.play();
			TIMER = setInterval(startTimer, 1000);
			updateScores('playerTow', false);
			updateAnswersCounters('playerTow', false);
			break;
	}
}
// Update Score
function updateScores(player, answer) {
	switch (player) {
		case 'playerOne':
			if (answer === true) {
				//score++
				playerOneScore += 100000;
				playerOneScoreDisplay.innerHTML = numberWithCommas(playerOneScore);
				playerOneScoreDisplay.classList.add('bounceIn');
				setTimeout(function() {
					playerOneScoreDisplay.classList.remove("bounceIn")
				}, 700);
				if (playerOneScore > 900000) {
					gameOver('playerOne');
				}
			} else if (answer === false) {
				// score minus zero nothing else
				if (playerOneScore != 0) {
					playerOneScore -= 100000;
					playerOneScoreDisplay.innerHTML = numberWithCommas(playerOneScore);
					playerOneScoreDisplay.classList.add('shake');
					setTimeout(function() {
						playerOneScoreDisplay.classList.remove("shake")
					}, 700);
				}
			}
			break;
		case 'playerTow':
			if (answer === true) {
				//score++
				playerTowScore += 100000;
				playerTowScoreDisplay.innerHTML = numberWithCommas(playerTowScore);
				playerTowScoreDisplay.classList.add('bounceIn');
				setTimeout(function() {
					playerTowScoreDisplay.classList.remove("bounceIn")
				}, 700);
				if (playerTowScore > 900000) {
					gameOver('playerTow');
				}
			} else if (answer === false) {
				// score minus zero nothing else
				if (playerTowScore != 0) {
					playerTowScore -= 100000;
					playerTowScoreDisplay.innerHTML = numberWithCommas(playerTowScore);
					playerTowScoreDisplay.classList.add('shake');
					setTimeout(function() {
						playerTowScoreDisplay.classList.remove("shake")
					}, 700);
				}
			}
			break;
	}
}

function updateAnswersCounters(player,answer) {
	switch (player) {
		case 'playerOne':
			if(answer === true) {
				playerOneAnswerCorrectCount += 1;
				playerOneAnswerCorrectCountDisplay.innerHTML = 'Answer Correct: '+playerOneAnswerCorrectCount+ ' &nbsp;';				
			}else if (answer === false) {
				playerOneAnswerWrongCount += 1;
				playerOneAnswerWrongCountDisplay.innerHTML = 'Answer Wrong: '+playerOneAnswerWrongCount;
			}
			break;
		case 'playerTow':
			if(answer === true) {
				playerTowAnswerCorrectCount += 1;
				playerTowAnswerCorrectCountDisplay.innerHTML = 'Answer Correct: '+playerTowAnswerCorrectCount+ ' &nbsp;';

			}else if (answer === false) {
				playerTowAnswerWrongCount += 1;
				playerTowAnswerWrongCountDisplay.innerHTML = 'Answer Wrong: '+playerTowAnswerWrongCount;
			}
			break;
	}
}
// if curent player was wrong answer move this question to the next player
function moveQuestionToNextPlayer() {
	if (playerOne === true) {
		playerTow = true;
		playerOne = false;
		asnwerWrong('playerOne');
	} else if (playerTow === true) {
		playerTow = false;
		playerOne = true;
		asnwerWrong('playerTow');
	}
}
// Game Over
function gameOver(player) {
	gameOverCover.classList.remove('sr-only');
	gameOverCover.classList.add('lightSpeedIn');
	clapSound.play();
	if (player === 'playerOne') {
		playerWin.innerHTML = PlayerOneNameDisplay.textContent;
	} else if (player === 'playerTow') {
		playerWin.innerHTML = PlayerTowNameDisplay.textContent;
	}
	introSound.pause();
	count = 0;
	clearInterval(TIMER);
}
// Pause game
function pauseGame() {
		if (TIMER > 1) {
		clearInterval(TIMER);
		TIMER = -1;
		count = 0;
		introSound.pause();
		pauseGameBTN.innerHTML = 'Resume Game';
		pauseGameBTN.classList.add('btn-success');
		pauseGameBTN.classList.remove('btn-danger');
		pauseGameCover.classList.remove('sr-only');
		pauseGameCover.classList.add('lightSpeedIn');
	} else {
		introSound.play();
		introSound.loop = true;
		TIMER = setInterval(startTimer, 1000);
		pauseGameBTN.innerHTML = 'Pause Game'
		pauseGameBTN.classList.add('btn-danger');
		pauseGameBTN.classList.remove('btn-success');
		pauseGameCover.classList.add('sr-only');
		pauseGameCover.classList.remove('lightSpeedIn');
	}
}
// Restart game
function restartGame() {
	gameOverCover.classList.add('sr-only');
	gameOverCover.classList.remove('lightSpeedIn');
	clapSound.pause();
	playerOneScore = 0;
	playerTowScore = 0;
	playerOne = true;
	playerOneScoreDisplay.innerHTML = playerOneScore;
	playerTowScoreDisplay.innerHTML = playerTowScore;
	count = 0;
	clearInterval(TIMER);
	displayQuestions();
	introSound.play();
	introSound.loop = true;
	playerOne = true;
	playerTow = false;
	playerOneNowPlay.classList.add('player_board_active','lightSpeedIn');
	playerTowNowPlay.classList.remove('player_board_active','lightSpeedIn');
	playerOneDisabled.classList.remove('player_board_disabled');
	playerTowDisabled.classList.add('player_board_disabled');
}
// A commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Events
stratGamtBTN.addEventListener('click', startGame);
answerTextA.addEventListener('click', () => {
	cheackAnswer('1');
});
answerTextB.addEventListener('click', () => {
	cheackAnswer('2');
});
answerTextC.addEventListener('click', () => {
	cheackAnswer('3');
});
answerTextD.addEventListener('click', () => {
	cheackAnswer('4');
});
pauseGameBTN.addEventListener('click', () => {
	pauseGame();
});
restartGameBTN.addEventListener('click', restartGame);
// Create Questions in  Object Array [let]

