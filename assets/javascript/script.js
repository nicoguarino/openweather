// Search for a city on input and click on search-btn

// current and future conditions for that city and it is saved to local storage as history

// When Searched presented with city name, date, icon, temp, humity, wind speed, uv index

// uv index presents conditions that show favorable, moderate, or severe

// display 5 day weather forecast that shows same displays as daily forecast

// when clicking on past history they are presented with current and future conditions for click city

var userSearchEl = document.querySelector("#city-search");
var searchBarEl = document.querySelector("#search-bar");
var cityTitleEl = document.querySelector('#forecast-city');


// Submit City Function
var CitySubmitHandler = function(event) {
    event.preventDefault();

    var InputEl = userSearchEl.value.trim(); 

    if (InputEl) {
        
        getWeather(InputEl);

      //  userSearchEl.value = "";

    } else {
        alert("City searched is not found.");
    }
}

var getWeather = function (search) {
    // format the api url
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + search +
    "&appid=d3f5af43f561d831f34569cf6fef321f";

    fetch(weatherApi)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeather(data, data.main.name);
                })
            } else {
                alert("City not found.")
            } 
        });
};

var displayWeather = function(weatherData, cityNameEl) {

    cityTitleEl.textcontent = cityNameEl;

    if (weatherData === 0) {

        cityTitleEl.textcontent = "City Not Found."
        return;
    }


};

searchBarEl.addEventListener("submit", CitySubmitHandler);