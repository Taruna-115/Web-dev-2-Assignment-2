const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const historyDiv = document.getElementById("history");
const consoleOutput = document.getElementById("consoleOutput");

function log(message) {
    console.log(message);
    consoleOutput.textContent += message + "\n";
}

