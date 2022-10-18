const urlJoke:string[] = ["https://icanhazdadjoke.com/", "https://v2.jokeapi.dev/joke/Any?lang=es&type=single"];
const header:object ={
  method: 'get',
  headers: {
    'Accept': 'application/json'
  },
}

let jokeText: HTMLElement|null = document.getElementById('joke-text');
let scoringButtons: HTMLElement|null = document.getElementById('scoring-buttons');
let nextJokeButton: HTMLElement|null = document.getElementById('next-joke-button');
let weatherIcon: HTMLElement|null = document.getElementById('weather-icon');
let temperature: HTMLElement|null = document.getElementById('temperature');

let currentJoke:string;
let reportJokes:object[] = [];

const getJoke = () => { 

  nextJokeButton?.setAttribute('disabled', '');
  let url:string = urlJoke[Math.floor(Math.random() * (1- 0 + 1) + 0)]
  
  fetch(url,header)
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
    jokeText!.innerHTML = currentJoke;
    jokeText!.removeAttribute('class');
    nextJokeButton?.classList.add('d-none');
    scoringButtons?.classList.remove('d-none');
    nextJokeButton?.removeAttribute('disabled');

  })
  .catch((reject) => {

    console.error(reject)
    nextJokeButton?.removeAttribute('disabled');

  });
}
const jokeScore = (score:number) => {
  
  reportJokes.push({joke: currentJoke, score: score, date: new Date().toISOString()})
  scoringButtons?.classList.add('d-none');
  nextJokeButton?.classList.remove('d-none');
  console.log(reportJokes);

}

let urlWeater:string = "https://icanhazdadjoke.com/";

let getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

let getWeather = () =>{
  fetch(urlWeater,header)
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
    weatherIcon!.setAttribute('src', `/src/img/${request.current_weather.weathercode}.svg`);
    temperature!.innerHTML = request.current_weather.temperature;
    
  })
  .catch((reject) => console.error(reject));
}

let weather = () =>{
  getPosition()
  .then((position:any) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    urlWeater = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin`;
    getWeather();
  })
  .catch((err) => {
    console.error(err.message);
  });
}
weather()