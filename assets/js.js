$(document).ready(function() {
    let history = [];
  
    function fetchWeatherData(city) {
      const apikey = '1182b819fb971825022b5fab780f5857';
      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},uk&appid=${apikey}`;
  
      fetch(queryURL)
        .then(response => response.json())
        .then(data => processWeatherData(data))
        .catch(error => displayErrorMessage(error));
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
      const city = $('#search-input').val().trim();
  
      if (city !== '') {
        const storedCity = capitalizeFirstLetter(city);
  
        $('.history-button').filter(function() {
          return $(this).data('city') === storedCity;
        }).remove();
  
        if (!history.includes(storedCity) && !$('#search-form button[data-city="' + city + '"]').length) {
          createHistoryButton(storedCity);
        }
  
        fetchWeatherData(storedCity);
        $('#search-input').val('');
      }
    }
  
    function createHistoryButton(city) {
      const button = $('<button type="button">' + city + '</button>');
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
  
    function processWeatherData(data) {
      displayWeatherData(data);
    }
  
    // Create buttons
    const searchButton = $('<button type="submit" class="search-button btn">Search</button>');
    const clearButton = $('<button class="clear-button btn">Clear History</button>');
  
    // Append buttons to form
    $('#search-form').append(searchButton, clearButton);
  
    // Attach event listeners
    $('#search-form').on('submit', handleFormSubmit);
    clearButton.on('click', function() {
      $('.history-button').remove();
      history = [];
  
      // Remove the forecast data
      const forecastContainer = $('#forecast');
      forecastContainer.empty();
    });

    function handleFormSubmit(event) {
        event.preventDefault();
        const city = $('#search-input').val().trim();
      
        if (city !== '') {
          const storedCity = capitalizeFirstLetter(city);
      
          $('.history-button').filter(function() {
            return $(this).data('city') === storedCity;
          }).each(function() {
            const existingButton = $(this);
            const existingCity = existingButton.text();
      
            if (existingCity === city) {
              // Existing button for the city exists, don't create a new one
              existingButton.remove();
            }
          });
      
          if (!history.includes(storedCity) && !$('#search-form button[data-city="' + city + '"]').length) {
            createHistoryButton(storedCity);
          }
      
          fetchWeatherData(storedCity);
          $('#search-input').val('');
        }
      }





    function displayWeatherData(data) {
        $('.city-name').text(data.city.name);
      
        const forecastContainer = $('#forecast');
        forecastContainer.empty();
        console.log(data);
        const currentCity = data.city.name
        const currentWeather = data.list[0];
        const currentTemperature = (currentWeather.main.temp - 273.15).toFixed(2);
        const currentWeatherDesc = capitalizeFirstLetter(currentWeather.weather[0].description);
        const currentWindSpeed = currentWeather.wind.speed;
        const currentHumidity = currentWeather.main.humidity;
        const currentWeatherIcon = currentWeather.weather[0].icon;
      
        const currentWeatherCardTitle = $(' <h2 class="cityName">' + currentCity + '</h2>')
        const currentWeatherCard = $('<div class="weather-card"></div>');
        currentWeatherCard.html(`
       
          <h3>Current Weather</h3>
          <img src="https://openweathermap.org/img/wn/${currentWeatherIcon}.png" alt="${currentWeatherDesc}">
          <p>Temperature: ${currentTemperature}°C</p>
          <p>Weather: ${currentWeatherDesc}</p>
          <p>Wind Speed: ${currentWindSpeed} m/s</p>
          <p>Humidity: ${currentHumidity}%</p>
        `);
      
        forecastContainer.append(currentWeatherCardTitle);
        forecastContainer.append(currentWeatherCard);
        
        const forecastDays = data.list.filter(day => {
          const time = day.dt_txt.split(' ')[1];
          return time === '12:00:00';
        }).slice(0, 5);
      
        forecastDays.forEach(day => {
          const date = day.dt_txt.split(' ')[0];
          const temperature = (day.main.temp - 273.15).toFixed(2);
          const weatherDesc = capitalizeFirstLetter(day.weather[0].description);
          const windSpeed = day.wind.speed;
          const humidity = day.main.humidity;
          const weatherIcon = day.weather[0].icon;
      
          const forecastCard = $('<div class="weather-card"></div>');
          forecastCard.html(`
            <h3>Forecast for ${date}</h3>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDesc}">
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDesc}</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
          `);
      
          forecastContainer.append(forecastCard);
        });
      }
  });