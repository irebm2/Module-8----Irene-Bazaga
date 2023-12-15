$(document).ready(function() {
    // Array to store the searched cities
    var history = [];
  
    function fetchWeatherData(city) {
      var apikey = '1182b819fb971825022b5fab780f5857';
      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},uk&appid=${apikey}`;
  
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
  
      // Check if the city exists in the history array
      if (!history.includes(city)) {
        // Add the city to the history array
        history.push(city);
  
        // Create a history button for the new city
        createHistoryButton(city);
      } else {
        console.log('Skipping adding ' + city + ' to the history, since it is already present.');
      }
  
      // Clear the input value after submission
      $('#search-input').val('');
    }
  
    function createHistoryButton(city) {
      var capitalizedCity = capitalizeFirstLetter(city);
  
      // Check if the city is in the history array
      if (!history.includes(capitalizedCity)) {
        // Create the button and add it to the history list
        var button = $('<button type="button"></button>');
        button.text(capitalizedCity);
        button.addClass('history-button');
        button.data('city', capitalizedCity);
  
        var historyList = $('#history');
        historyList.append(button);
      }
    }
  
    // Helper function to capitalize the first letter of a string
  
    
  function
   
  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    var removeButton = $('<button class="remove-button btn"> Clear history </button>');
    var inputGroup = $('.input-group');
    inputGroup.append(removeButton);
  
    removeButton.on('click', function() {
      // Empties the history array
      history = [];
  
      // Remove all child elements with the class "history-button" from the "history" container
      $('#history').children('.history-button').remove();
    });
  
    var searchBar = $('#search-input');
  });