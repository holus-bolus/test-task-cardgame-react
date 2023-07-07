import React from 'react';

import "./Player.css"

const Player = ({hand, hitMe, stay, gameOver}) => {
    return (
        <div className="player">
            <h1>Player</h1>
            {hand.map((card, index) => (
                <div key={index} className={`card ${card.suit.toLowerCase()}`}> {/* Add classes to card */}
                    {card.value}{card.suit}
                </div>
            ))}
            <button onClick={hitMe} disabled={gameOver}>Hit me</button>
            <button onClick={stay}>Stay</button>
        </div>
    );
}

export default Player;
