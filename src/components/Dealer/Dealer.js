import Hand from "../Hand/Hand";

const Dealer=({ hand }) =>{
    return (
        <div className="dealer">
            <h2>Dealer</h2>
            <Hand cards={hand} />
        </div>
    );
}


export default Dealer;