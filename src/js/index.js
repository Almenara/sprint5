"use strict";
const urlJoke = "https://icanhazdadjoke.com/";
const header = {
    method: 'get',
    headers: {
        'Accept': 'application/json'
    },
};
let scoringButtons = document.getElementById('scoring-buttons');
let nextJokeButton = document.getElementById('next-joke-button');
let weatherIcon = document.getElementById('weather-icon');
let temperature = document.getElementById('temperature');
let currentJoke;
let reportJokes = [];
const getJoke = () => {
    nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.setAttribute('disabled', '');
    fetch(urlJoke, header)
        .then((resolve) => {
        if (resolve.ok) {
            return resolve.json();
        }
        throw {
            statusText: resolve.statusText,
            status: resolve.status
        };
    })
        .then((request) => {
        currentJoke = request.joke;
        document.getElementById('joke-text').innerHTML = currentJoke;
        nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.classList.add('d-none');
        scoringButtons === null || scoringButtons === void 0 ? void 0 : scoringButtons.classList.remove('d-none');
        nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.removeAttribute('disabled');
    })
        .catch((reject) => {
        console.error(reject);
        nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.removeAttribute('disabled');
    });
};
const jokeScore = (score) => {
    reportJokes.push({ joke: currentJoke, score: score, date: new Date().toISOString() });
    scoringButtons === null || scoringButtons === void 0 ? void 0 : scoringButtons.classList.add('d-none');
    nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.classList.remove('d-none');
    console.log(reportJokes);
};
let urlWeater = "https://icanhazdadjoke.com/";
let getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
let getWeather = () => {
    fetch(urlWeater, header)
        .then((resolve) => {
        if (resolve.ok) {
            return resolve.json();
        }
        throw {
            statusText: resolve.statusText,
            status: resolve.status
        };
    })
        .then((request) => {
        console.log(request.current_weather);
        weatherIcon.setAttribute('src', `/src/img/${request.current_weather.weathercode}.svg`);
        temperature.innerHTML = request.current_weather.temperature;
    })
        .catch((reject) => console.error(reject));
};
let weather = () => {
    getPosition()
        .then((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        urlWeater = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin`;
        getWeather();
    })
        .catch((err) => {
        console.error(err.message);
    });
};
weather();
