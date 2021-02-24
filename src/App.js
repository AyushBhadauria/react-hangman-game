import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Figure from './components/Figure';
import Word from './components/Word';
import Popup from './components/Popup';
import Alphabets from './components/Alphabets';
import Timer from './components/Timer';
import AllGames from './components/AllGames';
import Button from './components/Button';
import { setCorrectLetters, setWrongLetters, setSeletectWord } from './redux/game/actions'
import { saveGame } from './redux/games/actions'
import { checkWin, COUNTER_VALUE, WORDS } from './helpers/helpers';
import './App.scss';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
  }

  getEmptyState = () => {
    return {
      restartedGameId: null,
      counter: 100,
      currentPage: 'new-game',
      popupTitle: '',
      popupMessage: ''
    }
  }
  componentDidMount() {
    this.props.setSeletectWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.correctLetters.length !== this.props.correctLetters.length || prevProps.wrongLetters.length !== this.props.wrongLetters.length) {
      const gameState = checkWin(this.props.correctLetters, this.props.wrongLetters, this.props.selectedWord);
   
      if(gameState === 'win') {
        this.saveGame();
        this.setState({
          popupTitle: 'WINNER',
          popupMessage: `You guessed right: ${this.props.selectedWord}`,
        })
      }
      if(gameState === 'lose') {
        this.setState({
          popupTitle: 'LOSER',
          popupMessage: <Figure errors={6}  />,
        })
      }
  
      this.updateCounter(COUNTER_VALUE)
    }
  }

  onPageChange = (page, resetGame = false) => {
    if(resetGame) {
       this.playAgain();
    } else {
      this.setState({ currentPage: page })
    }
  

  }

  playAgain = () => {
    this.setState(this.getEmptyState());
    this.props.setCorrectLetters([]);
    this.props.setWrongLetters([]);
    this.props.setSeletectWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  onAlphabetsPress = (letter) => {
    const { correctLetters, selectedWord, wrongLetters } = this.props;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        this.props.setCorrectLetters([...correctLetters, letter]);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        this.props.setWrongLetters([...wrongLetters, letter]);
      }
    }
  }

  saveGame = () => {
    const { correctLetters, selectedWord, wrongLetters, games } = this.props;

    if(this.state.restartedGameId) {
      const oldGameIndex = games.findIndex(game => game.id === this.state.restartedGameId);
      games[oldGameIndex] = {
        id: this.state.restartedGameId,
        correctLetters,
        selectedWord,
        wrongLetters,
        isCompleted: checkWin(correctLetters, wrongLetters, selectedWord) === 'win',
        date: new Date(),
      }
    } else {
     const newGame = {
      id: games.length + 1,
      correctLetters,
      selectedWord,
      wrongLetters,
      isCompleted: checkWin(correctLetters, wrongLetters, selectedWord) === 'win',
      date: new Date(),
     }
     games.push(newGame);
    }

    this.props.saveGame([...games])

    this.onPageChange('all-games')

  }

  onResumeGame = (index) => {
    const gameToStart = this.props.games[index];
    if(!gameToStart.isCompleted) {
      this.setState({restartedGameId: gameToStart.id})
      this.props.setCorrectLetters(gameToStart.correctLetters);
      this.props.setWrongLetters(gameToStart.wrongLetters);
      this.props.setSeletectWord(gameToStart.selectedWord);
      this.onPageChange('new-game');
      this.updateCounter(COUNTER_VALUE)
    }
  }

  updateCounter = (counter) => {
    if(!counter) {
      this.setState({
        counter: 0,
        popupTitle: 'LOSER',
        popupMessage: <Figure errors={6}  />,
      })
    } else {
      this.setState({counter})
    }

  }
  renderGame() {
    const { correctLetters, selectedWord, wrongLetters } = this.props;
    return (
      <div className="game-grid-container">
        <div className="grid-item"> 
         {this.state.counter ? <Timer counter={this.state.counter} updateCounter={this.updateCounter}/> : null}
        </div>
        <div className="grid-item">
          <div>
            <Figure errors={wrongLetters.length} />
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            <Alphabets
              wrongLetters={wrongLetters}
              correctLetters={correctLetters}
              onClick={this.onAlphabetsPress} />
          </div>
        </div>
        <div className="grid-item">
          <Button onClick={this.playAgain} label={'New word'} />
          <Button onClick={this.saveGame} label={'Save game'}
           className={'save-game-button'} />
        </div>
      </div>
    )
  }

  render() {
    const { games } = this.props;
    const {currentPage, popupMessage, popupTitle} = this.state;

    return (
      <>
        <Header currentPage={currentPage} onPageChange={this.onPageChange} />
        <div className="game-container">
          {currentPage === 'all-games' ?
            <AllGames games={games} onResumeGame={this.onResumeGame} /> :
            this.renderGame()
          }
        </div>
        <Popup
          popupTitle={popupTitle}
          popupMessage={popupMessage}
          playAgain={this.playAgain} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedWord: state.game.word,
  correctLetters: state.game.correctLetters,
  wrongLetters: state.game.wrongLetters,
  games: state.games.games
});

const mapDispatchToProps = (dispatch) => ({
  setCorrectLetters: (letters) => dispatch(setCorrectLetters(letters)),
  setWrongLetters: (letters) => dispatch(setWrongLetters(letters)),
  setSeletectWord: (word) => dispatch(setSeletectWord(word)),
  saveGame: (game) => dispatch(saveGame(game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
