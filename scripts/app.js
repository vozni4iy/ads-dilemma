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
	
	var introText = "The goal of the game is not to earn more money than computer," +
	" but to test different advertisement strategies. It seems a good decision" +
	"for a company to adopt big advertising budget and to earn more money " +
	"than competitors. But it is a very bad decision for whole market. " +
	"In this game you can test your strategy vs \"tit for tat\" computer strategy, " +
	"which wins a lot of contests.";
	
	var rules = "The rules are simple. You need to choose big or small advertisement budget." +
	"If you and your computer opponent choose small budgets, both of you earn 2000$." +
	"If you choose small budget and your opponent choose big budget, you earn 500$ and your" +
	"opponent earns 4000$. And vise versa, if you choose big budget and your opponent choose" +
	"small budget, you earn 4000$ and your opponent earns 500$. If both of you choose big budgets," +
	"you and computer earn 1000$. The game lasts 10 turns.";
	
	var header = <h1>Ads dilemma (John Nash Game Theory)</h1>;
	
	if (!startGame) {
		var letsPlay = 
		<div>
		  <section>{introText}</section>
		  <section className = 'rules'>{rules}</section>
		  <button className = 'button btn-center' onClick={this.onStart}>
		    <h2>Let's Play</h2>
		  </button>
		</div>  
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
	  <div className = 'content'>
        <div className = 'container'>
	      {header}
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
		<div className='copyright'>@Igor Skakun, 2016</div>
	  </div>
    );
  }
});

module.exports = App;