import React from 'react'
import Button from './Button';

// rafce
const Header = ({currentPage, onPageChange}) => {
  const changedPage = currentPage === 'new-game' ? 'all-games' : 'new-game';
  const label = currentPage === 'new-game' ? 'All Games' : 'New Game';

  return (
    <>
      <h1>The Hangman Game</h1>
      <Button className={'save-game-button'} onClick={()=> onPageChange(changedPage, changedPage === 'new-game')} label={label}  />
    </>
  )
}

export default Header
