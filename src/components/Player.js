import Hand from "./Hand";

function Player({ hand, hitMe, stay }) {
    return (
        <div className="player">
            <h2>Player</h2>
            <Hand cards={hand} />
            <button onClick={hitMe}>Hit me</button>
            <button onClick={stay}>Stay</button>
        </div>
    );
}

export default Player;