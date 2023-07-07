import React from 'react';

import "./Player.css"

const Player = ({hand, hitMe, stay, gameOver}) => {
    return (
        <div className="player">
            <h1>Player</h1>
            <div className="cards-flex">
                {hand.map((card, index) => (
                    <div key={index} className={`card ${card.suit.toLowerCase()}`}> {/* Add classes to card */}
                        {card.value}{card.suit}
                    </div>
                ))}
            </div>
   <div className="button-wrapper">
       <button onClick={hitMe} disabled={gameOver}>Hit me</button>
       <button onClick={stay}>Stay</button>
   </div>
        </div>
    );
}

export default Player;
