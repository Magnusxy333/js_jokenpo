let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins: 0,
    losses:0,
    ties: 0
  }
}

updateScoreElement();

function resetScore(){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
  localStorage.removeItem('score');
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1 / 3  ){
    computerMove = 'ROCK';
  } else if (randomNumber >= 1/3 && randomNumber <  2 / 3) {
    computerMove = 'PAPER';
  } else if (randomNumber >= 2/3 && randomNumber <  1) {
    computerMove = 'SCISSORS';
  }

  return computerMove;
}

const buttonAuto = document.querySelector('.js-auto-play-button');
let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying && buttonAuto.innerHTML === 'Auto play') {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove)
    }, 100);
    buttonAuto.innerHTML = 'Playing'
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-button').innerHTML === 'Auto playing'
    buttonAuto.innerHTML = 'Auto play'
    isAutoPlaying = false
  }
}

function playGame(playerMove){
  computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'SCISSORS') {
    if(computerMove === 'ROCK'){
      result = 'VOCÊ PERDEU';
    } else if (computerMove === 'PAPER') {
      result = 'VOCÊ GANHOU';
    } else if (computerMove === 'SCISSORS') {
      result = 'VOCÊ EMPATOU';
    }

  } else if(playerMove === 'ROCK') {
    if(computerMove === 'ROCK'){
      result = 'VOCÊ EMPATOU';
    } else if (computerMove === 'PAPER') {
      result = 'VOCÊ PERDEU';
    } else if (computerMove === 'SCISSORS') {
      result = 'VOCÊ GANHOU';
    }   

  } else if(playerMove === 'PAPER') {
    if(computerMove === 'ROCK'){
      result = 'VOCÊ GANHOU';
    } else if (computerMove === 'PAPER') {
      result = 'VOCÊ EMPATOU';
    } else if (computerMove === 'SCISSORS') {
      result = 'VOCÊ PERDEU';
    }
  }

  if (result === 'VOCÊ GANHOU') {
    score.wins += 1;
  } else if (result === 'VOCÊ EMPATOU') {
    score.ties += 1;
  } else if (result === 'VOCÊ PERDEU') {
    score.losses += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = 
    `${result}`;
    
  document.querySelector('.js-move').innerHTML = `
    VOCÊ 
    <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">
    <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">
    COMPUTADOR
  `;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = 
  `Vitórias: ${score.wins} Derrotas: ${score.losses} Empates: ${score.ties}`;
}
