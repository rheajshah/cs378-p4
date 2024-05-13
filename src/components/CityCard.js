import React from 'react';
import "./CityCard.css";

function CityCard({ cityName, currentTemp, onClick, onDelete, isSelected}) {
    const cardClassName = isSelected ? "city-card card mb-3 selected" : "city-card card mb-3";
    
    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent the onClick event of the card from firing
        onDelete(); // Call the onDelete function passed from the parent component
    };

    return (
        <div className={cardClassName} onClick={onClick}>
            <button className="delete-button" onClick={handleDeleteClick}>X</button>  
            <div className="card-body">
                <h5 className="card-title-1">{cityName}</h5>
                <p className="card-text-1">Now: {currentTemp}°F</p>
            </div>
        </div>
    );
}

export default CityCard;
