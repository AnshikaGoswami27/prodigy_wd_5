const apiKey='d2bf917915c64ba48ca63034240408';
const apiUrl='https://www.weatherapi.com/api-explorer.as';

async function fetchWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
            updateWeather(data);
        } else {
            alert('Location not found.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                updateWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }, (error) => {
            alert('Unable to retrieve your location.');
            console.error('Error getting location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function updateWeather(data) {
    document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
}
