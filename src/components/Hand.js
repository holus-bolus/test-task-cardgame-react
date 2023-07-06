import Card from "./Card";

function Hand({ cards }) {
    return (
        <div className="hand">
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    );
}

export default Hand;