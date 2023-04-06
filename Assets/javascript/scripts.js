// Weather Api
var displayWeather = document.getElementById("weather-side");
var getButton = document.getElementById("search");
var displayFood = document.getElementById("food");
var instructId = document.getElementById("instructId");
var myRecipe = document.getElementById("recipeId");
var foodImg = document.getElementById("foodImg");
var inputTemp = "";
var selectedArray = [];
var hotMealId = [
  "53013",
  "52839",
  "53014",
  "52819",
  "52773",
  "52960",
  "53040",
  "53016",
  "52813",
  "52806",
];

var coldMealId = [
  "52903",
  "52922",
  "52925",
  "52904",
  "53006",
  "52954",
  "52840",
  "52841",
  "52956",
  "52824",
  "52803",
  "52826",
  "52997",
];

getButton.addEventListener("click", function (event) {
  event.preventDefault();
  var place = document.getElementById("your-search").value;
  var city = place;

  function getWeather() {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=b841c05ff9d8a8a4f747f93083d432a9";

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var myCity = document.createElement("h3");
        var myDesc = document.createElement("p");
        var myTemp = document.createElement("p");

        if (data.main.temp > 60) {
          console.log("hot");
          inputTemp = "hot";
          return inputTemp;
        } else {
          console.log("cold");
        }

        myCity.textContent = data.name;
        myDesc.textContent = data.weather[0].description;
        myTemp.textContent = data.main.temp;

        displayWeather.append(myCity);
        displayWeather.append(myDesc);
        displayWeather.append(
          "The temperature in " + city + " is " + data.main.temp + " degress"
        );
      });
  }

  if (inputTemp === "hot") {
    selectedArray = hotMealId;
  } else {
    selectedArray = coldMealId;
  }
  function getRandomMealId(selectedArray) {
    console.log(selectedArray)
    var randomIndex = Math.floor(Math.random() * selectedArray.length);
    return selectedArray[randomIndex];
    
  }

  var randomMealId = getRandomMealId(selectedArray);
  var mealId = randomMealId;
  var url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  function getFood() {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var meal = data.meals[0];
        var mealNameDis = meal.strMeal;
        var imageDis = meal.strMealThumb;
        var instructDis = meal.strInstructions;
        var img = new Image(500);
        img.src = imageDis;

        var myFood = document.createElement("h4");
        var myInstruct = document.createElement("p");
        var myRecipe = document.createElement("p");

        myFood.textContent = data.meals[0].strMeal;
        instructDis.textContent = data.meals.strInstructions;

        foodImg.append(img);
        displayFood.append(myFood);
        instructId.append(instructDis);

        var foodArray = [];
        for (var i = 1; i <= 25; i++) {
          var ingredient = meal["strIngredient" + i];
          var measurement = meal["strMeasure" + i];
          if (ingredient && measurement) {
            foodArray.push(ingredient + ": " + measurement);
          }
        }

        recipeId.innerHTML =
          "<ul><li>" + foodArray.join("</li><li>") + "</li></ul>";
      });
  }
  getWeather();
  getFood();
});
