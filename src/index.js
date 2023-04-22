

function showDate(time){
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturaday",
]
let day = days[currentTime.getDay()];

let minutes=currentTime.getMinutes();
if(minutes<10){
    minutes=`0${minutes}`;
}
let hours=currentTime.getHours();
if(hours<10){
    hours =`0${hours}`;
}

return`${day} ${hours}:${minutes}`;
}
let currentTime = new Date();
let showTime=document.querySelector("#timer");
showTime.innerHTML=showDate(currentTime);



function showData(response){
    document.querySelector("#living").innerHTML=response.data.name;
    document.querySelector("#preci").innerHTML=`Visibility : ${response.data.visibility}`;
   document.querySelector("#number").innerHTML = Math.round(response.data.main.temp);
 document.querySelector("#wind").innerHTML=`Wind : ${response.data.wind.speed}km/h`;
let iconElement=document.querySelector("#sunIcon");
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
}

function showWeatherCondition(event){
    event.preventDefault();
let apiKey = "97f8e93f00107773f88eafd933ce86b7"; 
let cityName=document.querySelector("#enterCity").value;
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showData);

}

let place=document.querySelector("#search");
place.addEventListener("click",showWeatherCondition);

function showDay(timestamp){
let date=new Date(timestamp*1000);
let day=date.getDay();
let days=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
return days[day]

}
function showForecast(response){
    let forecastTemperature=response.data.daily;
let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;
forecastTemperature.forEach(function(displayDay,index){
 if(index<6){ 

forecastHTML =
  forecastHTML +
  `<div class="col-2">
    <div class="days">
       ${showDay(displayDay.dt)}
        <div class="iconic">
           <img src="https://openweathermap.org/img/wn/${displayDay.weather[0].icon}@2x.png" alt="clear"/></div>
        <div class="temperatureMax">
         <span>${Math.round(displayDay.temp.max)}°</span>
         <span>${Math.round(displayDay.temp.min)}°</span>
</div>
</div>
</div>`;
}
});


forecastHTML=forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;
}


function getForecast(coordinates){
let apiKey = "97f8e93f00107773f88eafd933ce86b7";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showForecast);
}