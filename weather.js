document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = 'e43527672965235c28ed7b8d1bc68511'; // Replace with your actual API key
    const city = 'PUNE'; // Replace with your actual city
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            suggestCrops(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));

    function displayWeatherData(data) {
        const weatherDetails = document.getElementById('weather-details');
        const { main, weather } = data;
        weatherDetails.innerHTML = `
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Condition: ${weather[0].description}</p>
        `;
    }

    function suggestCrops(data) {
        const cropSuggestions = document.getElementById('crop-suggestions');
        const { main } = data;
        let crops = [];

        if (main.temp > 25) {
            crops = ['Rice', 'Cotton', 'Maize'];
        } else if (main.temp > 15) {
            crops = ['Wheat', 'Barley', 'Peas'];
        } else {
            crops = ['Oats', 'Carrots', 'Potatoes'];
        }

        cropSuggestions.innerHTML = `<ul>${crops.map(crop => `<li>${crop}</li>`).join('')}</ul>`;
    }
});