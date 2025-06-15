import { cityData } from './data.js';
import { fetchWeather } from './api.js';
import { populateCityDropdown, renderWeather, showLoading, showError } from './ui.js';

const citySelect = document.getElementById('citySelect');
const weatherDisplay = document.getElementById('weatherDisplay');

// Initialize dropdown
populateCityDropdown(citySelect);

// Handle city selection
citySelect.addEventListener('change', async (e) => {
    if (!e.target.value) {
        weatherDisplay.innerHTML = '';
        return;
    }

    const [lat, lon] = e.target.value.split(',');
    const city = cityData.find(c => c.latitude == lat && c.longitude == lon).city;

    showLoading(weatherDisplay);
    try {
        const data = await fetchWeather(lat, lon);
        renderWeather(data, city, weatherDisplay);
    } catch (error) {
        showError(weatherDisplay);
    }
});