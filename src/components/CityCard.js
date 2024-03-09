import React from 'react';


function CityCard({cityName, currentTemp, highTemp, lowTemp }) {
 return (
   <div className="card mb-3">
     <div className="card-body">
       <h5 className="card-title">{cityName}</h5>
       <p className="card-text">Current Temperature: {currentTemp}°</p>
       <p className="card-text">High: {highTemp}° Low: {lowTemp}°</p>
     </div>
   </div>
 );
}


export default CityCard;