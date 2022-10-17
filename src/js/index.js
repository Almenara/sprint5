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
        console.log(reject);
        nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.removeAttribute('disabled');
    });
};
const jokeScore = (score) => {
    reportJokes.push({ joke: currentJoke, score: score, date: new Date().toISOString() });
    scoringButtons === null || scoringButtons === void 0 ? void 0 : scoringButtons.classList.add('d-none');
    nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.classList.remove('d-none');
    console.log(reportJokes);
};
