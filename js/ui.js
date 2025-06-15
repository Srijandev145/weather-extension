import { cityData } from './data.js';

const weatherIcons = {
    'clear': '☀️',
    'pcloudy': '⛅',
    'cloudy': '☁️',
    'rain': '🌧️',
    'snow': '❄️',
    'ts': '⛈️',
    'fog': '🌫️'
};

export function populateCityDropdown(citySelect) {
    cityData.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.latitude},${city.longitude}`;
        option.textContent = `${city.city}, ${city.country}`;
        citySelect.appendChild(option);
    });
}

export function renderWeather(data, city, weatherDisplay) {
    weatherDisplay.innerHTML = `
        <h2>Weather in ${city}</h2>
        <div class="forecast-grid">
            ${data.dataseries.map(day => {
                // Parse YYYYMMDD format
                const dateStr = day.date.toString();
                const year = dateStr.slice(0, 4);
                const month = dateStr.slice(4, 6) - 1; // Month is 0-based in JavaScript
                const dayOfMonth = dateStr.slice(6, 8);
                const formattedDate = new Date(year, month, dayOfMonth).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });

                return `
                    <div class="forecast-card">
                        <p><strong>${formattedDate}</strong></p>
                        <p class="weather-icon">${weatherIcons[day.weather] || '🌤️'}</p>
                        <p>High: ${day.temp2m.max}°C</p>
                        <p>Low: ${day.temp2m.min}°C</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

export function showLoading(weatherDisplay) {
    weatherDisplay.innerHTML = '<p>Loading weather data...</p>';
}

export function showError(weatherDisplay, message = 'Error fetching weather data. Please try again.') {
    weatherDisplay.innerHTML = `<p>${message}</p>`;
}