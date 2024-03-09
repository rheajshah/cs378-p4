import React from 'react';
import "./CityCard.css";

function CityCard({ cityName, currentTemp, onClick }) {
    return (
        <div className="card mb-3" onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title">{cityName}</h5>
                <p className="card-text">Now: {currentTemp}°F</p>
            </div>
        </div>
    );
}

export default CityCard;
