// Weather Api
var displayWeather = document.getElementById("weather-side");
var getButton = document.getElementById("search");

getButton.addEventListener("click", function(event) {
    event.preventDefault();
    var place = document.getElementById("your-search").value;
    var city = place

    function getWeather() {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b841c05ff9d8a8a4f747f93083d432a9"

        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            var myCity = document.createElement("h3");
            var myDesc = document.createElement("p");
            var myTemp = document.createElement("p");
            
            myCity.textContent = data.name;
            myDesc.textContent = data.weather[0].description;
            myTemp.textContent = data.main.temp;

            displayWeather.append(myCity);
            displayWeather.append(myDesc);
            displayWeather.append("The temperature in " + city + " is " + data.main.temp +" degress");

            if (data.main.temp > 60) {
                console.log("hot")
                return "hot";
            } else {
                console.log("cold")
                return "cold";
            }  
        });
    }
    
    getWeather();
});