

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
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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



let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;
let forecastTemperature=["Sun","Sat"];
forecastTemperature.forEach(function(Day){

forecastHTML =
  forecastHTML +
  `
<div class="col-2">
    <div class="days">
        ${Day}
        <div class="iconic">
           <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="clear"/></div>
        <div class="temperatureMax">
         <span>34°</span>
         <span>37°</span>
</div>
</div>`;

});


forecastHTML=forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;
