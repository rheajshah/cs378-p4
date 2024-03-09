import React from 'react';

function formatTime(time) {
    const date = new Date(time);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours} ${ampm}`;
  }

function CityCard({cityName, currentTemp, hourlyTimeArray, hourlyTempArray, highTemp, lowTemp}) {
    // Prepare hourly forecast data for rendering
    const hourlyForecastData = hourlyTimeArray.map((time, index) => {
        const temp = hourlyTempArray[index];
        return { time: formatTime(time), temp };
    });

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{cityName}</h5>
                <p className="card-text">Current Temperature: {currentTemp}°</p>
                <p className="card-text">High: {`${highTemp}°F`} Low: {`${lowTemp}°F`}</p>

                <div>
                    <h6>Hourly Forecast</h6>
                    <ul>
                        {hourlyForecastData.map((forecast, index) => (
                            <li key={index}>{`${forecast.time}: ${forecast.temp}°F`}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default CityCard;