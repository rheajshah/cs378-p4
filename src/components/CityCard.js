import React from 'react';
import "./CityCard.css";

function CityCard({ cityName, currentTemp, onClick, isSelected}) {
    const cardClassName = isSelected ? "city-card card mb-3 selected" : "city-card card mb-3";
    return (
        <div className={cardClassName} onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title-1">{cityName}</h5>
                <p className="card-text-1">Now: {currentTemp}°F</p>
            </div>
        </div>
    );
}

export default CityCard;
