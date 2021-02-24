import React from 'react';
import Button from './Button';

const Popup = ({popupMessage, popupTitle, playAgain}) => {

  return (
    popupTitle ? <div className="popup-container">
      <div className="popup">
        <h2>{popupTitle}</h2>
        <h3>{popupMessage}</h3>
        <Button  onClick={playAgain} label={'Play Again'}/>
      </div>
    </div> : null
  )
}

export default Popup
