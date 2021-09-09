var userSearchEl = document.querySelector("#city-search");
var searchBarEl = document.querySelector("#search-bar");
var cityTitleEl = document.querySelector('#forecast-city');

// checking to see if there is any exsiting data in local storage and if not assigning a blank array
var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];



// Submit City Function
function CitySubmitHandler(event) {
    event.preventDefault();

    var InputEl = userSearchEl.value.trim();

   // if (searchedCities.indexOf(searchedCities) === -1){};

    if (InputEl && searchedCities.indexOf(InputEl) === -1) {

        saveCityEl(InputEl);

        getWeather(InputEl);

        // userSearchEl.value = "";
        return;

    } else {
        alert("City searched is not found.");
    }
}

// When Searched presented with city name, date, icon, temp, humity, wind speed, uv index

// uv index presents conditions that show favorable, moderate, or severe

// display 5 day weather forecast that shows same displays as daily forecast

// needs to use different api. This one does have uv or future forcast
var getWeather = function (search) {
    // format the api url
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="
        + search +
        "&appid=d3f5af43f561d831f34569cf6fef321f";

    fetch(weatherApi)
        .then(function(response) {
           return response.json();

        })
        .then(function(data) {

            // displaying city Searched
            cityTitleEl.textContent = data.name;

            // pushing name to array in local storage
            searchedCities.push(data.name);

            //setting city searched to local storage
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));


            console.log(searchedCities);

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
                + data.coord.lat + "&lon=" + data.coord.lon
                + "&appid=d3f5af43f561d831f34569cf6fef321f")
                .then(function (response) {
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    displayWeather(data);
                });

        });

};

// trying to pull api content and display
var displayWeather = function (data) {
    var windSpeed = document.createElement("p");
    var dailytemp = document.createElement('P');
    var dailyHumidity = document.createElement('p');
    var uvIndex = document.createElement('p');

    dailytemp.textContent = "Temp: " + data.current.temp;
    cityTitleEl.appendChild(dailytemp);

    windSpeed.textContent = "Wind Speed: " + data.current.wind_speed;
    cityTitleEl.appendChild(windSpeed);

    dailyHumidity.textContent = "Humidity: " + data.current.humidity;
    cityTitleEl.appendChild(dailyHumidity);

    uvIndex.textContent = "UV Index: " + data.current.uvi;
    cityTitleEl.appendChild(uvIndex);

    for (let i = 0; i < data.daily.length; i++) {
        
        
    }


};

// can't get inputEl to save to searchedCities array
var saveCityEl = function (InputEl) {
  //  localStorage.setItem('searchedCityEl', JSON.stringify(searchedCities.value));

    //searchedCities = JSON.parse(localStorage.getItem('searchCities'));
    // $('.search-history').html('');

    for (let i = 0; i <= searchedCities.length; i++) {
        $('.search-history').append("<button>" + searchedCities[i] + "</button>");

    }
};

// when clicking on past history they are presented with current and future conditions for click city
searchBarEl.addEventListener("submit", CitySubmitHandler);