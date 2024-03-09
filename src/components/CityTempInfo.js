import React from 'react';
import "./CityTempInfo.css";

function formatTime(time) {
    const date = new Date(time);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
}

function CityTempInfo({cityName, currentTemp, hourlyTimeArray, hourlyTempArray, highTemp, lowTemp}) {
    // Find the index of the current time
    const currentTimeIndex = hourlyTimeArray.findIndex(time => new Date(time) > Date.now());

    // Prepare hourly forecast data for rendering
    let hourlyForecastData = hourlyTimeArray.slice(currentTimeIndex).map((time, index) => {
        const temp = hourlyTempArray[currentTimeIndex + index];
        return { time: formatTime(time), temp };
    });

    // Add current time and temperature as the first row
    hourlyForecastData = [{ time: 'Now', temp: `${currentTemp}` }, ...hourlyForecastData];

    // Display only the next 12ish hours
    hourlyForecastData = hourlyForecastData.slice(0, 13);

    return (
        <div className="card mb-3">
            <div className="card-body temp-info-card-body">
                <h5 className="card-title city-name">{cityName}</h5>
                <p className="card-text curr-temp">{currentTemp}°F</p>
                <div className="row card-text high-low">
                    <p className="col">High: {`${highTemp}°F`}</p>
                    <p className="col">Low: {`${lowTemp}°F`}</p>
                </div>
            
                <div>
                    <h6>Hourly Forecast</h6>
                    {hourlyForecastData.map((forecast, index) => (
                        <div key={index} className="row mb-2 temp">
                            <div className="col">{forecast.time}</div>
                            <div className="col">{`${forecast.temp}°F`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CityTempInfo;
