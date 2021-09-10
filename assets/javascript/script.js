var userSearchEl = document.querySelector("#city-search");
var searchBarEl = document.querySelector("#search-bar");
var cityTitleEl = document.querySelector('#forecast-city');

// checking to see if there is any exsiting data in local storage and if not assigning a blank array
var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];



// Submit City Function
function CitySubmitHandler(event) {
    event.preventDefault();

    var InputEl = userSearchEl.value.trim();


    if (InputEl &&  searchedCities.indexOf(InputEl) === -1) {

        saveCityEl(InputEl);

        getWeather(InputEl);

        return;

    } else {
        alert("City searched is not found.");
    }
}

//fetch weather apis
var getWeather = function (search) {
    // format the api url
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="
        + search +
        "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f";

    fetch(weatherApi)
        .then(function(response) {
           return response.json();

        })
        .then(function(data) {

            // displaying city Searched
            cityTitleEl.textContent = data.name + ": " + moment().format("L");

            // pushing name to array in local storage
            searchedCities.push(data.name);

            //setting city searched to local storage
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));


            console.log(searchedCities);

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
                + data.coord.lat + "&lon=" + data.coord.lon
                + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f")
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
    
    //creating p elements to display data
    var windSpeed = document.createElement("p");
    var dailytemp = document.createElement('P');
    var dailyHumidity = document.createElement('p');
    var uvIndex = document.createElement('p');

    // craeting a div is hold daily forecast data
    var dailyContainer = document.querySelector("#daily-container");
    var dailyForcastData = document.createElement("div");
    dailyForcastData.classList = "";
    dailyContainer.appendChild(dailyForcastData);

   // cityTitleEl.textContent = data.current.weather[0].icon;

    //displaying daily forecast date and appending it to div
    dailytemp.textContent = "Temp: " + data.current.temp + "°F";
    dailyForcastData.appendChild(dailytemp);

    windSpeed.textContent = "Wind Speed: " + data.current.wind_speed;
    dailyForcastData.appendChild(windSpeed);

    dailyHumidity.textContent = "Humidity: " + data.current.humidity;
    dailyForcastData.appendChild(dailyHumidity);

    uvIndex.textContent = "UV Index: " + data.current.uvi;
    dailyForcastData.appendChild(uvIndex);

    // for loop is iterating future days of the week
    for (let i = 1; i < 6; i++) {

        //selecting container for future forecast
        var weeklyContainer = document.querySelector("#display-week");

        //creating divs to hold each days data
        var futureDayContainer = document.createElement("div");
        futureDayContainer.classList = "col-3 weekly-card";
        weeklyContainer.appendChild(futureDayContainer);

        //creating future days elements
        var futuredateEl = document.createElement('p');
        var futureDayTemp = document.createElement('p');
        var futureDayWindSpeed = document.createElement('p');
        var futureDayHumidity = document.createElement('p');

        //pulling and appending data for future days
        futuredateEl.textContent = moment.unix(data.daily[i].dt).format("L[:]");
        futureDayContainer.appendChild(futuredateEl);

        futureDayTemp.textContent = "Temp: " + data.daily[i].temp.day  + "°F";
        futureDayContainer.appendChild(futureDayTemp);

        futureDayWindSpeed.textContent = "Wind Speed: " + data.daily[i].humidity;
        futureDayContainer.appendChild(futureDayWindSpeed);

        futureDayHumidity.textContent = "Humidity: " + data.daily[i].wind_speed;
        futureDayContainer.appendChild(futureDayHumidity);
    }
};

// can't get inputEl to save to searchedCities array
var saveCityEl = function () {

    for (let i = 0; i <= searchedCities.length; i++) {

        //selecting container for search history
        var searchHistoryContainer = document.querySelector("#search-history-container");

        var searchButtonDivEl = document.createElement("div");
        searchHistoryContainer.appendChild(searchButtonDivEl);
        

        //button based on search history created
        var searchHistoryBtn = document.createElement("p");
        searchHistoryBtn.classList = "search-history-btns";

        searchHistoryBtn.textContent = searchedCities[i];
        searchButtonDivEl.appendChild(searchHistoryBtn);
    }
};

// when clicking on past history they are presented with current and future conditions for click city
searchBarEl.addEventListener("submit", CitySubmitHandler);