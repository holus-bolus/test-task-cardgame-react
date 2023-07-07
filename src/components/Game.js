import { useState, useEffect } from 'react';
import Player from "./Player";
import Dealer from "./Dealer";

function Game() {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [turn, setTurn] = useState('player');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    // Create and shuffle the deck
    useEffect(() => {
        setDeck(createDeck());
    }, []);

    function createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }

        // Shuffle the deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }

    function startGame() {
        // Draw two cards for the player and one for the dealer
        setPlayerHand([drawCard(), drawCard()]);
        setDealerHand([drawCard()]);
    }

    function drawCard() {
        const newDeck = [...deck];
        const drawnCard = newDeck.pop();
        setDeck(newDeck);
        return drawnCard;
    }

    function calculateHand(hand) {
        let values = hand.map(card => {
            if (['J', 'Q', 'K'].includes(card.value)) {
                return 10;
            } else if (card.value === 'A') {
                return 11;
            } else {
                return parseInt(card.value);
            }
        });

        const sum = values.reduce((a, b) => a + b, 0);

        // Handle Aces (value: 1 or 11)
        values.filter(value => value === 11).forEach(_ => {
            if (sum > 21) {
                return sum - 10;
            }
        });

        return sum;
    }

    // Player actions
    function hitMe() {
        if (turn !== 'player') return;  // It must be the player's turn to hit

        // Draw a new card
        const card = drawCard();

        if (!card) {
            console.error('No more cards in the deck.');
            return;
        }

        // Add the new card to the player's hand
        setPlayerHand(prevHand => [...prevHand, card]);

        // If the player's hand value exceeds 21, end the game and declare the dealer the winner
        if (calculateHand(playerHand) > 21) {
            setGameOver(true);
            setWinner('dealer');
        }
    }


    function stay() {
        if (!gameOver) {
            setTurn('dealer');
            dealerPlay();
        }
    }

    // Dealer's logic
    function dealerPlay() {
        while (calculateHand(dealerHand) <= 16 && !gameOver) {
            setDealerHand([...dealerHand, drawCard()]);
        }
        if (calculateHand(dealerHand) > 21) {
            setGameOver(true);
            setWinner('player');
        } else {
            // Determine who won
            const playerScore = calculateHand(playerHand);
            const dealerScore = calculateHand(dealerHand);
            if (playerScore > dealerScore) {
                setGameOver(true);
                setWinner('player');
            } else if (dealerScore > playerScore) {
                setGameOver(true);
                setWinner('dealer');
            } else {
                setGameOver(true);
                setWinner('tie');
            }
        }
    }



    return (
        <div className="game">
            {!gameOver && <button onClick={startGame}>Start</button>}
            {gameOver && <div>Game Over. Winner: {winner}</div>}
            <Dealer hand={dealerHand} />
            <Player hand={playerHand} hitMe={hitMe} stay={stay} />
        </div>
    );
}


export default Game;
