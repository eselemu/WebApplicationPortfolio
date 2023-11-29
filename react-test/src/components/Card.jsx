import React from "react";
import './Card.css';

function Card(props) {
    return (
        <div className="card">
            <div className="top">
                <h2 className="name">{props.name}</h2>
                <img className="circle-img" src={props.img} alt="Random guy" />
            </div>
            <div className="bottom">
                <p className="info">{props.phone}</p>
            </div>
        </div>
    );
}

export default Card;