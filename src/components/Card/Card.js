const Card=({ value, suit })=> {
    return (
        <div className="card">
            <div className="value">{value}</div>
            <div className="suit">{suit}</div>
        </div>
    );
}

export default Card;