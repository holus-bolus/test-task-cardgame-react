// import {useState, useEffect} from 'react';
// import Player from "../Player/Player";
// import Dealer from "../Dealer/Dealer";
// import "./Game.css";
//
//
// function Game() {
//     const [deck, setDeck] = useState([]);
//     const [playerHand, setPlayerHand] = useState([]);
//     const [dealerHand, setDealerHand] = useState([]);
//     const [turn, setTurn] = useState('player');
//     const [gameOver, setGameOver] = useState(false);
//     const [winner, setWinner] = useState(null);
//
//     // Create and shuffle the deck
//     useEffect(() => {
//         setDeck(createDeck());
//     }, []);
//
//     const [balance, setBalance] = useState(100); // Initialize user balance
//     const [bet, setBet] = useState(10); // Initialize current bet
//
//     useEffect(() => {
//         if (balance < 0) {
//             setBalance(10 * bet);
//         }
//     }, [balance, bet]);
//
//     function restartGame() {
//         setDeck(createDeck());
//         setPlayerHand([]);
//         setDealerHand([]);
//         setTurn('player');
//         setGameOver(false);
//         setWinner(null);
//     }
//
//     function createDeck() {
//         const suits = ['♠', '♥', '♦', '♣'];
//         const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//         let deck = [];
//
//         for (let suit of suits) {
//             for (let value of values) {
//                 deck.push({suit, value});
//             }
//         }
//
//         // Shuffle the deck
//         for (let i = deck.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [deck[i], deck[j]] = [deck[j], deck[i]];
//         }
//
//         return deck;
//     }
//
//     function startGame() {
//         // Check if user has enough balance to place the bet
//         if (balance < bet) {
//             alert('Insufficient balance!');
//             return;
//         }
//         // Deduct bet from balance
//         setBalance(prevBalance => prevBalance - bet);
//         // Draw two cards for the player and one for the dealer
//         setPlayerHand([drawCard(), drawCard()]);
//         setDealerHand([drawCard()]);
//
//     }
//     useEffect(() => {
//         if (gameOver) {
//             if (winner === 'player') {
//                 // If the player won, they get double their bet
//                 setBalance(prevBalance => prevBalance + bet * 2);
//             } else if (winner === 'dealer') {
//                 // If the dealer won, the player gets nothing (bet is lost)
//             } else if (winner === 'tie') {
//                 // If it's a tie, the player gets their bet back
//                 setBalance(prevBalance => prevBalance + bet);
//             }
//         }
//     }, [gameOver, winner, bet]);
//     function drawCard() {
//         const newDeck = [...deck];
//         const drawnCard = newDeck.pop();
//         setDeck(newDeck);
//         return drawnCard;
//     }
//
//     function calculateHand(hand) {
//         let values = hand.map(card => {
//             if (['J', 'Q', 'K'].includes(card.value)) {
//                 return 10;
//             } else if (card.value === 'A') {
//                 return 11;
//             } else {
//                 return parseInt(card.value);
//             }
//         });
//
//         const sum = values.reduce((a, b) => a + b, 0);
//
//         // Handle Aces (value: 1 or 11)
//         values.filter(value => value === 11).forEach(_ => {
//             if (sum > 21) {
//                 return sum - 10;
//             }
//         });
//
//         return sum;
//     }
//
//     // Player actions
//     function hitMe() {
//         if (turn !== 'player') return;  // It must be the player's turn to hit
//
//         // Draw a new card
//         const card = drawCard();
//
//         if (!card) {
//             console.error('No more cards in the deck.');
//             return;
//         }
//
//         // Add the new card to the player's hand
//         setPlayerHand(prevHand => [...prevHand, card]);
//
//         // If the player's hand value exceeds 21, end the game and declare the dealer the winner
//         if (calculateHand(playerHand) > 21) {
//             setGameOver(true);
//             setWinner('dealer');
//         }
//     }
//
//
//     function stay() {
//         if (!gameOver) {
//             setTurn('dealer');
//             dealerPlay();
//         }
//     }
//
//     // Dealer's logic
//     function dealerPlay() {
//         while (calculateHand(dealerHand) <= 16 && !gameOver) {
//             setDealerHand([...dealerHand, drawCard()]);
//         }
//         if (calculateHand(dealerHand) > 21) {
//             setGameOver(true);
//             setWinner('player');
//         } else {
//             // Determine who won
//             const playerScore = calculateHand(playerHand);
//             const dealerScore = calculateHand(dealerHand);
//             if (playerScore > dealerScore) {
//                 setGameOver(true);
//                 setWinner('player');
//             } else if (dealerScore > playerScore) {
//                 setGameOver(true);
//                 setWinner('dealer');
//             } else {
//                 setGameOver(true);
//                 setWinner('tie');
//             }
//         }
//     }
//
//
//     return (
//         <div className="game">
//             <div className="game-container">
//                 {/* Show current balance and allow user to set bet */}
//                 <p>Balance: ${balance}</p>
//                 <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} />
//                 {!gameOver && <button onClick={startGame}>Start</button>}
//                 {gameOver && <div>Game Over. Winner: {winner}</div>}
//                 {gameOver && <button onClick={restartGame}>Restart</button>} {/* Add this line */}
//                 <Dealer hand={dealerHand}/>
//                 <Player hand={playerHand} hitMe={hitMe} stay={stay}
//                         gameOver={gameOver}/> {/* Pass down 'gameOver' prop */}
//             </div>
//         </div>
//     );
// }
//
//
// export default Game;
import {useState, useEffect} from 'react';
import Player from "../Player/Player";
import Dealer from "../Dealer/Dealer";
import "./Game.css";


function Game() {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [turn, setTurn] = useState('player');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [playerBalance, setPlayerBalance] = useState(100); // Added player balance, set it to 100 initially
    const betAmount = 10; // You can adjust this value

    // Create and shuffle the deck
    useEffect(() => {
        setDeck(createDeck());
    }, []);

    const [balance, setBalance] = useState(100); // Initialize user balance
    const [bet, setBet] = useState(10); // Initialize current bet

    useEffect(() => {
        if (balance < 0) {
            setBalance(10 * bet);
        }
    }, [balance, bet]);

    function restartGame() {
        setDeck(createDeck());
        setPlayerHand([]);
        setDealerHand([]);
        setTurn('player');
        setGameOver(false);
        setWinner(null);
    }

    function createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({suit, value});
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
        // Check if user has enough balance to place the bet
        handleBet();
        if (balance < bet) {
            alert('Insufficient balance!');
            return;
        }
        // Deduct bet from balance
        setBalance(prevBalance => prevBalance - bet);
        // Draw two cards for the player and one for the dealer
        setPlayerHand([drawCard(), drawCard()]);
        setDealerHand([drawCard()]);

    }
    useEffect(() => {
        if (gameOver) {
            if (winner === 'player') {
                // If the player won, they get double their bet
                setBalance(prevBalance => prevBalance + bet * 2);
            } else if (winner === 'dealer') {
                // If the dealer won, the player gets nothing (bet is lost)
            } else if (winner === 'tie') {
                // If it's a tie, the player gets their bet back
                setBalance(prevBalance => prevBalance + bet);
            }
        }
    }, [gameOver, winner, bet]);
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

    function handleBet() {
        if (playerBalance >= betAmount) {
            setPlayerBalance(playerBalance - betAmount);
            // Continue the game...
        } else {
            setGameOver(true);
            setWinner('dealer'); // The dealer wins by default if the player can't make a bet
        }
    }
    return (
        <div className="game">
            <div className="game-container">
                {/* Show current balance and allow user to set bet */}
                <p>Balance: ${balance}</p>
                <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} />
                {!gameOver && <button onClick={startGame}>Start</button>}
                {gameOver && <div>Game Over. Winner: {winner}</div>}
                {gameOver && <button onClick={restartGame}>Restart</button>} {/* Add this line */}
                <Dealer hand={dealerHand}/>
                <Player hand={playerHand} hitMe={hitMe} stay={stay}
                        gameOver={gameOver}/> {/* Pass down 'gameOver' prop */}

            </div>
        </div>
    );
}


export default Game;

