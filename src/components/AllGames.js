import React from 'react';
import Button from './Button';
import {getDate} from './../helpers/helpers';

const AllGames = ({ games, onResumeGame }) => {

    return (
        <div className="all-games">
            {games.length ?<table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Errors</td>
                        <td>Finished</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => (
                        <tr key={`Game-${index}`}>
                          <td>{getDate(game.date)}</td>
                          <td>{game.wrongLetters.length}</td>
                          <td>{game.isCompleted ? 'Yes' : 'No'}</td>
                          <td>{!game.isCompleted ? <Button onClick={()=> onResumeGame(index)} label={'Play'} /> : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>: <p style={{textAlign: 'center'}}>No games found</p> }
        </div>
    )
}

export default AllGames
