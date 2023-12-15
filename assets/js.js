$(document).ready(function() {
    $('#search-form').on('submit', handleFormSubmit);
  
    let history = [];
  
    function fetchWeatherData(city) {
      const apikey = '1182b819fb971825022b5fab780f5857';
      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},uk&appid=${apikey}`;
  
      fetch(queryURL)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          processWeatherData(data);
        })
        .catch(error => {
          console.error('Error:', error);
          displayErrorMessage(error);
        });
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
  
      const city = $('#search-input').val();
  
      if (city.trim() !== '') {
        const storedCity = capitalizeFirstLetter(city);
  
        $('.history-button').filter(function() {
          return $(this).data('city') === storedCity;
        }).remove();
  
        if (!history.includes(storedCity)) {
          createHistoryButton(storedCity);
        } else {
          console.log(`Skipping creating a history button for ${storedCity}, since it is already in the history.`);
        }
  
        fetchWeatherData(storedCity);
  
        $('#search-input').val('');
      }
    }
  
    function createHistoryButton(city) {
      const button = $('<button type="button"></button>');
      button.text(city);
      button.addClass('history-button');
      button.data('city', city);
  
      const historyList = $('#history');
      historyList.append(button);
  
      history.push(city);
    }
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    function displayErrorMessage(error) {
      $('#error-message').text(`An error occurred: ${error}`);
    }
  
    const removeButton = $('<button class="remove-button btn"> Clear history </button>');
    const inputGroup = $('.input-group');
    inputGroup.append(removeButton);
  
    removeButton.on('click', function() {
      $('.history-button').remove();
      history = [];
      $('.city-name').remove();
      $('#forecast').empty();
    });
  
    function displayWeatherData(data) {
      $('.city-name').text(data.city.name);
      const forecastContainer = $('#forecast');
      forecastContainer.empty();
  
      // Display the current weather in a big card
      const currentWeather = data.list[0];
      const currentTemperature = (currentWeather.main.temp - 273.15).toFixed(2);
      const currentWeatherDesc = currentWeather.weather[0].description;
  
      const currentWeatherCard = $('<div class="weather-card"></div>');
      currentWeatherCard.html(`<h3>Current Weather</h3><p>Temperature: ${currentTemperature}°C</p><p>Weather: ${currentWeatherDesc}</p>`);
  
      forecastContainer.append(currentWeatherCard);
  
      // Filter and display the forecast for the following 5 days at midday
      const forecastDays = data.list.filter(day => {
        const time = day.dt_txt.split(' ')[1];
        return time === '12:00:00';
      }).slice(0, 5);
  
      forecastDays.forEach(day => {
        const date = day.dt_txt.split(' ')[0];
        const temperature = (day.main.temp - 273.15).toFixed(2);
        const weatherDesc = day.weather[0].description;
  
        const forecastCard = $('<div class="weather-card"></div>');
        forecastCard.html(`<h3>Forecast for ${date}</h3><p>Temperature: ${temperature}°C</p><p>Weather: ${weatherDesc}</p>`);
  
        forecastContainer.append(forecastCard);
      });
    }
  
    function processWeatherData(data) {
      displayWeatherData(data);
    }
  });