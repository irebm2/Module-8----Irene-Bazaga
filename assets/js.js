$(document).ready(function() {
    // Attach the form submission handler to the search form
    $('#search-form').on('submit', handleFormSubmit);
  
    const history = new Set(); // Create a Set to keep track of unique cities
  
    function fetchWeatherData(city) {
      var apikey = '1182b819fb971825022b5fab780f5857';
      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apikey}`;
  
      fetch(queryURL)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Call functions to process and display the data on the page
        })
        .catch(error => console.error('Error:', error));
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
  
      var city = $('#search-input').val();
      fetchWeatherData(city);
  
      createHistoryButton(city);
      
      // Optional: Reset the input value after submission
      $('#search-input').val('');
    }
  
    function createHistoryButton(city) {
      // Convert the city name to start with an uppercase letter
      var capitalizedCity = capitalizeFirstLetter(city);
  
      if (!history.has(capitalizedCity)) { // Check if the city is already in the history
        var button = $('<button type="button"></button>');
        button.text(capitalizedCity);
        button.addClass('history-button');
  
        var historyList = $('#history');
        historyList.append(button);
  
        history.add(capitalizedCity); // Add the city to the history
      }
    }
  
    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  });