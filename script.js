const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const historyDiv = document.getElementById("history");
const consoleOutput = document.getElementById("consoleOutput");

function log(message) {
    console.log(message);
    consoleOutput.textContent += message + "\n";
}

// Load history on page load
window.onload = function () {
    log("Page Loaded (Sync)");
    displayHistory();
};

// Async weather function
async function fetchWeather(city) {

    log("Async Start fetching...");

    try {
        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("File not found");
        }

        const data = await response.json();

        // Simulate delay (Event Loop demo)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const cityData = data.find(
            item => item.name.toLowerCase() === city.toLowerCase()
        );

        if (!cityData) {
            throw new Error("City not found");
        }

        log("Promise resolved (Microtask)");
        displayWeather(cityData);
        saveToHistory(city);

    } catch (error) {
        log("Promise rejected (Error caught)");
        weatherResult.innerHTML =
            `<p class="error">City not found</p>`;
    }

    log("Async End");
}

// Display weather
function displayWeather(data) {
    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temp:</strong> ${data.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather}</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind} m/s</p>
    `;
}

// Save history
function saveToHistory(city) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    displayHistory();
}

// Display history
function displayHistory() {
    historyDiv.innerHTML = "";
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities.forEach(city => {
        const span = document.createElement("span");
        span.textContent = city;
        span.onclick = () => fetchWeather(city);
        historyDiv.appendChild(span);
    });
}

// Button click event
searchBtn.addEventListener("click", () => {

    log("Sync Start");
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetchWeather(city);

    log("Sync End");
});


// Promise demo using .then() / .catch()
function promiseDemo() {
    log("Promise Demo Start");

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => res.json())
        .then(data => {
            log("Then block executed");
        })
        .catch(err => {
            log("Catch block executed");
        });

    log("Promise Demo End");
}

promiseDemo();