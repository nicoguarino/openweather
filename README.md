# # Weather Dashboard

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Code Sample](#code-sample)
- [Acknowledgement](#acknowledgement)
- [Contributing](#contributing)
- [License](#license)

## About <a name = "about"></a>

Weather Dashboard is designed to show the consumer the weather forecast for today and for the following 5 days. It saves and displays the last cities searched.

## Getting Started <a name = "getting-started"></a>

* [Git Hub Pull](https://github.com/nicoguarino/openweather.git)
* [Code Quiz Website](https://nicoguarino.github.io/openweather/)

## Code Sample <a name = "code-sample"></a>

![Sample Code](https://github.com/nicoguarino/openweather/blob/main/assets/images/sample_code.png "Sample Code")

### Sample Code
```HTML Sample
    <main class=" container flex-row justify-space-between">

        <div class="row">
            <div class="col-3">

                <div class="card">
                    <!--Search Bar-->
                    <h3 class="card-header text-uppercase sub-titles">Search By City</h3>
    
                    <form class="card-body" id="search-bar" type="text" >
                        
                        <label for="city-search" class="form-label"></label>
                        
                        <input type="text" name="city-search" id="city-search" autofocus="true" class="form-input">
    
                        <button type="submit" class="search-btn">Search</button>
                    </form>
                </div>
            </div>

            <!--Daily Forecast-->
            <div class=" col-9 daily-forecast" id="daily-container"></div>
        </div>
```

```CSS Sample
* {
    margin: 0px;
    padding: 0px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
header {
    text-align: center;
    background-color: rgb(163, 100, 223);
    padding: 20px 20px;
}

.card-header {
    background-color: rgb(163, 100, 223);
}

.daily-forecast {
    border: solid black 1px;
}

h3 {
    font-size: 20px;
    font-weight: bold;
}

```
```JavaScript Sample
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

            // // displaying city Searched
            // cityTitleEl.textContent = data.name + ": " + moment().format("L");

            // // pushing name to array in local storage
            // searchedCities.push(data.name);

            // //setting city searched to local storage
            // localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
            displayCity(data);

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
```

## Authors and acknowledgement <a name = "acknowledgement"></a>

Nico (Filipu) Guarino


## Contributing <a name = "contributing"></a>

Weather Dashboard website is open for contrubiting, however check with the creator first before making any permanent changes. The creator is opening to creative ideas and tweeking of design, but it must be approved first.

## License <a name = "license">

(c) 2021 Weather Dashboard

