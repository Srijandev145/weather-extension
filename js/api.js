export async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}