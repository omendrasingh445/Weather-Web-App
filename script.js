let apiKEY = "c6d9cd7c610a9cfc356052ce7d18f547"
let apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

let search = document.querySelector(".search-box input")
let searchbtn = document.querySelector(".search-box button")
let weathericon = document.querySelector(".weather-title img")

let dateAndTime = document.querySelector(".main-container span")
let date = new Date();
dateAndTime.innerHTML = `Date : ${date.toDateString()}`;

function checkWeather(city) {
    // Animation 

    document.querySelector(".temp").classList.add("city-temp-anim")
    document.querySelector(".city").classList.add("city-temp-anim")
    weathericon.classList.add("weather-img-anim")
    document.querySelector(".description").classList.add("weather-img-anim")

    fetch(apiURL + city + `&appid=${apiKEY}`)
        .then((result) => {
            return result.json();
        }).then((data) => {

            // Validation 
            if (data.name === undefined) {
                search.classList.add("submitionError")
                search.value = "";
                search.placeholder = "Please Enter a Correct City Name";
                document.querySelector(".humidity").innerHTML = "";
                document.querySelector(".wind").innerHTML = "";
                document.querySelector(".pressure").innerHTML = "";
                weathericon.src = "";
                document.querySelector(".description").innerHTML = "";
                document.querySelector(".temp").innerHTML = "";
                document.querySelector(".city").innerHTML = "";

                // Animation 
                mainBox.style.height = "35%"
                weatherBox.style.height = "75%"
                searchBox.style.height = "25%"
                document.querySelector(".temp").classList.remove("city-temp-anim")
                document.querySelector(".city").classList.remove("city-temp-anim")
                weathericon.classList.remove("weather-img-anim")
                document.querySelector(".description").classList.remove("weather-img-anim")
                return;
            } else {
                search.classList.remove("submitionError")
                search.placeholder = "Enter City Name";
            }

            document.querySelector(".description").innerHTML = data.weather[0].description
            document.querySelector(".city").innerHTML = `${data.name} / ${data.sys.country}`
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
            document.querySelector(".pressure").innerHTML = data.main.pressure
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

            if (data.weather[0].main == "Clouds") {
                weathericon.src = "./Images/clouds.png"
            } else if (data.weather[0].main == "Rain") {
                weathericon.src = "./Images/rain.png"
            } else if (data.weather[0].main == "Mist") {
                weathericon.src = "./Images/mist.png"
            } else if (data.weather[0].main == "Drizzle") {
                weathericon.src = "./Images/drizzle.png"
            } else if (data.weather[0].main == "Clear") {
                weathericon.src = "./Images/clear.png"
            } else if (data.weather[0].main == "Smoke") {
                weathericon.src = "./Images/smoke.png"
            } else if (data.weather[0].main == "Haze") {
                weathericon.src = "./Images/haze.png"
            } else if (data.weather[0].main == "Thunderstorm") {
                weathericon.src = "./Images/thunderstorm.png"
            }

        })

}
let mainBox = document.querySelector(".main-box")
let searchBox = document.querySelector(".search-box")
let weatherBox = document.querySelector(".weather-box")

searchbtn.addEventListener("click", () => {
    mainBox.style.height = "70%"
    weatherBox.style.height = "85%"
    searchBox.style.height = "15%"
    checkWeather(search.value)
})
search.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        mainBox.style.height = "70%"
        weatherBox.style.height = "85%"
        searchBox.style.height = "15%"
        checkWeather(search.value)
    } else if (e.code == "Backspace") {
        mainBox.style.height = "35%"
        weatherBox.style.height = "75%"
        searchBox.style.height = "25%"
        // Animation 
        document.querySelector(".temp").classList.remove("city-temp-anim")
        document.querySelector(".city").classList.remove("city-temp-anim")
        weathericon.classList.remove("weather-img-anim")
        document.querySelector(".description").classList.remove("weather-img-anim")

        weathericon.src = "";
        document.querySelector(".description").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        document.querySelector(".pressure").innerHTML = "";
    }

})

let weatherBoard = document.querySelector(".main-box")
let weatherTitle = document.querySelector(".main-title")

if (window.location.reload) {
    setTimeout(() => {
        weatherTitle.classList.add('screenAnimation')
        weatherBoard.classList.add('screenAnimation')
        dateAndTime.classList.add("screenAnimation")
    }, 500)
}