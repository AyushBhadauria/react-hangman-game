import React from 'react'
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const Alphabets = ({onClick, wrongLetters, correctLetters}) => {
  const letters = [...wrongLetters, ...correctLetters];

  function onKeyPress(alphabet){
     if(!letters.includes(alphabet)) {
      onClick(alphabet) 
     }
  }
  return (
    <>
    <ul className="alphabet">
        {alphabets.map(alphabet =>
            <li 
            className={letters.includes(alphabet) ? 'disabled' : ''}
            onClick={()=> onKeyPress(alphabet)} key={`alphabet-item-${alphabet}`}>{alphabet}</li>
        )}
    </ul>
    </>
  )
}

export default Alphabets
