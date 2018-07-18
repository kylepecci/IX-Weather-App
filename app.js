var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
var DARKSKY_API_KEY = '85e77aceb2b303cb6924e2d9b242699b';
var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

var GOOGLE_MAPS_API_KEY = 'AIzaSyAxRVv7UEJ7Xe-RNzzXCnr3_r_hb3gYX6E';
var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');
var getWeatherButton = cityForm.querySelector('.get-weather-button');
var cityWeather = app.querySelector('.city-weather');

function getCoordinatesForCity(cityName) {
    // This is an ES6 template string, much better than verbose string concatenation...
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
  
    return (
      fetch(url) // Returns a promise for a Response
      .then(response => response.json()) // Returns a promise for the parsed JSON
      .then(data => data.results[0].geometry.location) // Transform the response to only take what we need
    );
}

function getCurrentWeather(coords) {
    // Template string again! I hope you can see how nicer this is :)
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=us&exclude=minutely,hourly,alerts,flags`;
  
    return (
    fetch(url)
    .then(response => response.json())
    .then(data => data.currently)
    );
}

function getDailyWeather(coords){
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=us&exclude=minutely,hourly,alerts,flags`;
  
    return (
    fetch(url)
    .then(response => response.json())
    .then(data => data)
    );
}

function addWeeklyWeather(weth)
{
  var tab = $(document.createElement("TABLE"));
  tab.addClass("tab");
  $(".city-weather").append(tab);


  var wet = weth.data;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date();
  
  $(".tab").append("<tr id='head'><th>Day</th><th>High</th><th>Low</th><th>Precip</th></tr>");
  for(var i = 0; i < 7; i++)
  {
    var Day = days[ ( d.getDay() + i) % 7 ];
    var High = wet[i].temperatureMax
    var Low = wet[i].temperatureMin
    var precip = wet[i].precipProbability
    var str = "<tr class='row'><th>" + Day + "</th><th>" + High + "°F</th><th>" + Low + "°F</th><th>" + Math.floor(precip * 100) + "%</th></tr>";
    $(".tab").append(str)
  }

}

cityForm.addEventListener('submit', function(event) { // this line changes
   event.preventDefault(); // prevent the form from submitting

   $("#welcome").hide();
   var city = cityInput.value; // Grab the current value of the input
   $(".city-weather").append("<p class='msg'>Loading...</p>")
   $(".tab").hide();
   $(".today").hide();
   $("#icon1").hide();
  
    getCoordinatesForCity(city) // get the coordinates for the input city
    .then(getDailyWeather) // get the weather for those coordinates
    .then(function(weth)
    {
      var tod = weth.currently;
      var temp = weth.daily.data[0].summary;
      var str = "<p class='today'>Today's Weather: " + temp + "</p>"
      var cur = "<p class='today'>Current Temperature: " + tod.temperature + "°F</p>";
      console.log(tod.icon);

      var skycons = new Skycons({"color": "white"});
      skycons.set("icon1", Skycons.CLEAR_DAY);
      switch(tod.icon)
      {
        case "partly-cloudy-night":
          skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
          break;
        case "clear-night":
          skycons.set("icon1", Skycons.CLEAR_NIGHT);
          break;
        case "rain":
          skycons.set("icon1", Skycons.RAIN);
          break;
        case "snow":
          skycons.set("icon1", Skycons.SNOW);
          break;
        case "sleet":
          skycons.set("icon1", Skycons.SLEET);
          break;
        case "fog":
          skycons.set("icon1", Skycons.FOG);
          break;
        case "cloudy":
          skycons.set("icon1", Skycons.CLOUDY);
          break;
        case "wind":
          skycons.set("icon1", Skycons.WIND);
          break;
        case "partly-cloudy-day":
          skycons.set("icon1", Skycons.PARTLY_CLOUDY_DAY);
          break;
      }
      $("#icon1").show();
      skycons.play();

      $(".city-weather").prepend(cur);
      $(".msg").hide();
      $("#icon1").after(str);
      addWeeklyWeather(weth.daily);

    }
    );
});