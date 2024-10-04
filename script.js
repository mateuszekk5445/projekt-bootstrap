//const apiKey = '62fc137715dc5e847a5da1b2905b06cc';
const apiKey = process.env.API_KEY;
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
        getForecastData(city);
    }
});

function getWeatherData(city) {
    fetch(`${apiBaseUrl}weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cityName').textContent = `Miasto: ${data.name}`;
            document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp} °C`;
            document.getElementById('description').textContent = `Pogoda: ${data.weather[0].description}`;
            document.getElementById('wind').textContent = `Prędkość wiatru: ${data.wind.speed} m/s`;
            document.getElementById('humidity').textContent = `Wilgotność: ${data.main.humidity}%`;
        })
        .catch(error => console.error('Błąd podczas pobierania danych pogodowych:', error));
}

function getForecastData(city) {
    fetch(`${apiBaseUrl}forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`)
        .then(response => response.json())
        .then(data => {
            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = '';
            //co 3 dni aktualizacja co 8 godzin
            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];
                const date = new Date(forecast.dt_txt).toLocaleDateString();
                const temp = forecast.main.temp;
                const description = forecast.weather[0].description;

                const forecastCard = `
                    <div class="col-md-4">
                        <div class="card bg-transparent text-white border-0">
                            <div class="card-body">
                                <h5>${date}</h5>
                                <p>Temp: ${temp} °C</p>
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                `;
                forecastElement.innerHTML += forecastCard;
            }
        })
        .catch(error => console.error('Błąd podczas pobierania danych pogodowych:', error));
}
