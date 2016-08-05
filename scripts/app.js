'use strict';
//require('./style.css');

var React = require('react');

var App = React.createClass({
	
  getInitialState() {
	return {startGame: false, choices: (new Array(10)).fill(true),
	turnNumber: 1, yourMoney: 0, compMoney: 0, message: '', whoTurn: 'user'};  
  },
  
  onStart() {
	 this.setState({startGame : true});
  },
  
  onFinish() {
	  this.setState({startGame: false, choices: (new Array(10)).fill(true),
	          turnNumber: 1, yourMoney: 0, compMoney: 0, message: '', whoTurn: 'user'});
  },
  
  onBigAd() {
	  this.onAd(true);
  },
  
  onSmallAd() {
	  this.onAd(false);
  },
  
  onAd(isBudgetBig) {
	  if (this.state.whoTurn !== 'user') {
		  return;
	  }
	  
	  var turnNumber = this.state.turnNumber;
	  var choices = this.state.choices;
	  if (isBudgetBig) {
	    var message = 'You choose Big Ad strategy.';
	  } else {
	    var message = 'You choose Small Ad strategy.';  
	  }
	  choices = choices.map((choice, index) => index === (turnNumber - 1) ? isBudgetBig : choice);
	  this.setState({choices: choices, message: message, whoTurn : 'computer'},
	    this.makeComputerTurn);
  },
  
  makeComputerTurn() {
	  var turnNumber = this.state.turnNumber;
	  var choices = this.state.choices;
	  var message = this.state.message;
	  var yourChoice = choices[turnNumber - 1];
	  var compChoice = turnNumber === 1 ? false : choices[turnNumber - 2];
	  if (compChoice) {
		  message += ' Your opponent choose Big Ad strategy.';
	  } else {
		  message += ' Your opponent choose Small Ad strategy.';
	  }
	  var yourMoney = this.state.yourMoney;
	  var compMoney = this.state.compMoney;
	  if (yourChoice && compChoice) {
		  yourMoney += 1000;
		  compMoney += 1000;
	  } else if (yourChoice) {
		  yourMoney += 4000;
		  compMoney += 500;
	  } else if (compChoice) {
		  yourMoney += 500;
		  compMoney += 4000;
	  } else {
		  yourMoney += 2000;
		  compMoney += 2000;
	  }
	  turnNumber++;
	  this.setState({yourMoney: yourMoney, compMoney: compMoney, message: message});
	  setTimeout( () => {
		  if (turnNumber === 11) {
			  this.setState({turnNumber: turnNumber, whoTurn: null});
		  } else {  
	          this.setState({turnNumber: turnNumber, whoTurn: 'user'});
		  }
	  }, 1000);
	  
  },
  
	
  render() {	
  
    var startGame = this.state.startGame;	
	var turnNumber = this.state.turnNumber;
	var endGame = startGame && (turnNumber === 11);
	
	if (!startGame) {
		var letsPlay = <button className = 'button btn-center' onClick={this.onStart}>
		  <h2>Let's Play</h2>
		</button>;
	} else if (startGame && !endGame)	{ 
	  var turnCounter = <div id='turnCounter'> {'Current turn: ' + this.state.turnNumber} </div>;	
	  var yourMoney = <div> {'You earn: ' + this.state.yourMoney + '$'} </div>;
	  var compMoney = <div> {'Your opponent earns: ' + this.state.compMoney + '$'} </div>;
	  var bigButton = <button className = 'button' onClick = {this.onBigAd}>
		  <h2>Big Ad budget</h2>
		</button>;
	  var smallButton = <button className = 'button' onClick = {this.onSmallAd}>
		  <h2>Small Ad budget</h2>
		</button>;	
	  var messageBox = <div>{this.state.message}</div>;
	} else {
		var results = <div className = 'messages'>
		{'You earn: ' + this.state.yourMoney + '$.' + ' Your opponent earns: ' + this.state.compMoney + '$.'}
		</div>;
		var finish = <button className = 'button btn-center' onClick={this.onFinish}>
		  <h2>End Game</h2>
		</button>;
	}
	
    return (
      <div>
	    {letsPlay}
		{turnCounter}
		<div className = 'messages'>
		  {yourMoney}
		  {compMoney}
		  {messageBox}
		</div>  
		<div className = 'buttons'>
		  {bigButton}
		  {smallButton}
		</div>
		{results}
		{finish}
	  </div>
    );
  }
});

module.exports = App;