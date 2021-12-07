'use strict';
var scores, roundScore, activePlayer, dice, gamePlaying, lastDice;

init();


document.querySelector('.btn--roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random Number
		var dice1 = Math.floor(Math.random()*6)+1;
		var dice2 = Math.floor(Math.random()*6)+1;

		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-'+dice1+'.png';
		document.getElementById('dice-2').src = 'dice-'+dice2+'.png';

		// 3. Update the round score if the rolled number was not a 1
		if (dice1 !== 1 && dice2!==1)  {
			// Add Score
			roundScore += dice1+dice2;
			document.querySelector('#current--'+activePlayer).textContent = roundScore;
		}else{
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn--hold').addEventListener('click', function(){
	if (gamePlaying) {
		// ADD Current Score to Global Score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score--'+activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;

		// Undefined, 0, null or "" are COERCED to false
		// Anything else is COERCED to true
		if (input) {
			winningScore = input;
		}else{
			winningScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer]>=winningScore) {
			document.querySelector('#name--'+activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player--'+activePlayer).classList.add('winner');
			document.querySelector('.player--'+activePlayer).classList.add('active');
			gamePlaying = false;
		}else{
			// Next Player
			nextPlayer();
		}	
	}
});

function nextPlayer(){
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current--0').textContent = '0';
		document.getElementById('current--1').textContent = '0';
		document.querySelector('.player--0').classList.toggle('player--active');
		document.querySelector('.player--1').classList.toggle('player--active');

		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);


function init(){
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score--0').textContent = '0';
	document.getElementById('score--1').textContent = '0';
	document.getElementById('current--0').textContent = '0';
	document.getElementById('current--1').textContent = '0';
	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';
	document.querySelector('.player--0').classList.remove('winner');
	document.querySelector('.player--1').classList.remove('winner');
	document.querySelector('.player--0').classList.remove('active');
	document.querySelector('.player--1').classList.remove('active');
	document.querySelector('.player--0').classList.add('active');
}

