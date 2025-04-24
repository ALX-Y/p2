document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '2042b5411da30413c8f923fabae05da3'; 
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherCard = document.querySelector('.weather-card');
    const loading = document.querySelector('.loading');
    const error = document.querySelector('.error');

    
    async function fetchWeather(city) {
        try {
            loading.classList.remove('hidden');
            weatherCard.classList.add('hidden');
            error.classList.add('hidden');

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
            );
            
            if (!response.ok) throw new Error('Город не найден');
            
            const data = await response.json();
            displayWeather(data);
            
        } catch (err) {
            loading.classList.add('hidden');
            error.classList.remove('hidden');
            console.error('Ошибка:', err);
        }
    }

    
    function displayWeather(data) {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind').textContent = data.wind.speed.toFixed(1);
        document.getElementById('description').textContent = data.weather[0].description;
        
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        loading.classList.add('hidden');
        weatherCard.classList.remove('hidden');
    }

    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    });

    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) fetchWeather(city);
        }
    });
});