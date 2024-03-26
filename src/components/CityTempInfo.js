import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library
import "./CityTempInfo.css";

function formatTime(time) {
    const date = new Date(time);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
}

function CityTempInfo({ cityName, currentTemp, hourlyTimeArray, hourlyTempArray, highTemp, lowTemp, timezone }) {
    // Ref for storing the Chart instance
    const chartRef = useRef(null);

    // Find the index of the current time based on the city's timezone
    const currentTimeIndex = hourlyTimeArray.findIndex(time => {
        const cityTime = new Date(time).toLocaleString('en-US', { timeZone: timezone });
        return new Date(cityTime) > new Date();
    });

    // Prepare hourly forecast data for rendering
    let hourlyForecastData = hourlyTimeArray.slice(currentTimeIndex).map((time, index) => {
        const temp = hourlyTempArray[currentTimeIndex + index];
        return { time: formatTime(time), temp };
    });

    // Add current time and temperature as the first row
    hourlyForecastData = [{ time: 'Now', temp: `${currentTemp}` }, ...hourlyForecastData];

    // Display only the next 12ish hours
    hourlyForecastData = hourlyForecastData.slice(0, 13);

    // Determine the range for y-axis
    const minY = Math.min(...hourlyForecastData.map(data => data.temp)) - 10;
    const maxY = Math.max(...hourlyForecastData.map(data => data.temp)) + 10;

    // Effect to create and update the chart
    useEffect(() => {
        // Destroy existing chart if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart
        const ctx = document.getElementById('tempChart').getContext('2d');
        const tempChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hourlyForecastData.map(data => data.time),
                datasets: [{
                    label: 'Temperature (°F)',
                    data: hourlyForecastData.map(data => data.temp),
                    borderColor: '#1c527f',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        min: minY,
                        max: maxY
                    }
                }
            }
        });

        // Save the Chart instance to ref
        chartRef.current = tempChart;

        // Clean up function to destroy the chart
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [hourlyForecastData]); // Update when hourly forecast data changes

    return (
        <div className="info-card card mb-3">
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
                {/* Chart canvas */}
                <canvas id="tempChart" />
            </div>
        </div>
    );
}

export default CityTempInfo;
