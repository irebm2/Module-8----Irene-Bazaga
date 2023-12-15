$(document).ready(function () {
    // Attach the form submission handler to the search form
    $('#search-form').on('submit', handleFormSubmit);
  
    let history = []; // Create an array to store the city history
  
    function fetchWeatherData(city) {
      const apikey = '1182b819fb971825022b5fab780f5857';
      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},uk&appid=${apikey}`;
  
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
  
      const city = $('#search-input').val();
  
      // Save the city name to a variable before checking the history array
      const storedCity = city;
  
      // Remove any existing buttons with the same city name
      $('.history-button').each(function () {
        if ($(this).text() === storedCity) {
          $(this).remove();
        }
      });
  
      // Check if the city is already in history
      if (!history.includes(storedCity)) {
        // Create the history button
        createHistoryButton(storedCity);
      } else {
        console.log('Skipping creating a history button for ' + storedCity + ', since it is already in the history.');
      }
  
      // Optional: Reset the input value after submission
      $('#search-input').val('');
    }
  
    function createHistoryButton(city) {
      const capitalizedCity = capitalizeFirstLetter(city);
  
      // Check if the city is in the history array
      if (!history.includes(capitalizedCity)) {
        // Create the button and add it to the history list
        const button = $('<button type="button"></button>');
        button.text(capitalizedCity);
        button.addClass('history-button');
        button.data('city', capitalizedCity);
  
        const historyList = $('#history');
        historyList.append(button);
  
        // Add the city to the history array
        history.push(capitalizedCity);
      }
    }
  
    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    const removeButton = $('<button class="remove-button btn"> Clear history </button>');
    const inputGroup = $('.input-group');
    inputGroup.append(removeButton);
  
    removeButton.on('click', function () {
      // Remove all child elements with the class "history-button" from the "history" container
      $('.history-button').remove();
  
      // Clear the history array
      history = [];
  
      // Optional: Create a history button for the previously searched city, even if it was listed before
      createHistoryButton(storedCity);
    });
  
    const searchBar = $('#search-input');
    const cityName = $('<h2 class="city-name">' + capitalizedCity + '</h2>');
    searchBar.closest('.input-group').append(cityName);
  });