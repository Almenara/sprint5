"use strict";
const urlJoke = "https://icanhazdadjoke.com/";
const header = {
    method: 'get',
    headers: {
        'Accept': 'application/json'
    },
};
const getJoke = () => {
    fetch(urlJoke, header)
        .then((resolve) => {
        if (resolve.ok) {
            let joke;
            return resolve.json();
        }
        throw {
            statusText: resolve.statusText,
            status: resolve.status
        };
    })
        .then((request) => {
        document.getElementById('joke-text').innerHTML = request.joke;
    })
        .catch((reject) => console.log(reject));
};
