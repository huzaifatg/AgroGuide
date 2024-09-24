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
            <div class="weather-card">
                <h3>Current Weather</h3>
                <p>Temperature: <strong>${main.temp}°C</strong></p>
                <p>Humidity: <strong>${main.humidity}%</strong></p>
                <p>Condition: <strong>${weather[0].description}</strong></p>
            </div>
        `;
    }

    function suggestCrops(data) {
        const cropSuggestions = document.getElementById('crop-suggestions');
        const { main } = data;
        let crops = [];

        if (main.temp > 25) {
            crops = [
                { name: 'Rice', description: 'A staple food for more than half of the world\'s population.' },
                { name: 'Cotton', description: 'Used to make fabrics and textiles.' },
                { name: 'Maize', description: 'Also known as corn, it is a versatile crop used for food and feed.' },
                { name: 'Sugarcane', description: 'A major source of sugar production.' },
                { name: 'Tropical fruits', description: 'Such as mangoes, bananas, and pineapples thrive in warm conditions.' }
            ];
        } else if (main.temp > 15) {
            crops = [
                { name: 'Wheat', description: 'A primary crop for bread and pasta.' },
                { name: 'Barley', description: 'Used in brewing and animal feed.' },
                { name: 'Peas', description: 'A protein-rich legume.' },
                { name: 'Rye', description: 'Used for bread, whiskey, and animal fodder.' },
                { name: 'Canola', description: 'Used for oil and animal feed.' }
            ];
        } else {
            crops = [
                { name: 'Oats', description: 'Great for breakfast cereals and animal feed.' },
                { name: 'Carrots', description: 'Rich in vitamins and versatile for cooking.' },
                { name: 'Potatoes', description: 'A staple vegetable used worldwide.' },
                { name: 'Cabbage', description: 'A cool-weather crop great for salads and cooking.' },
                { name: 'Garlic', description: 'A flavorful addition to many dishes and beneficial for health.' }
            ];
        }

        cropSuggestions.innerHTML = `
            <h3>Suggested Crops</h3>
            <ul class="crop-list">
                ${crops.map(crop => `<li><strong>${crop.name}:</strong> ${crop.description}</li>`).join('')}
            </ul>
        `;
    }
});
