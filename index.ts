const urlJoke:string = "https://icanhazdadjoke.com/";
const header:object ={
  method: 'get',
  headers: {
    'Accept': 'application/json'
  },
}

let scoringButtons: HTMLElement|null = document.getElementById('scoring-buttons');
let nextJokeButton: HTMLElement|null = document.getElementById('next-joke-button');

let currentJoke:string;
let reportJokes:object[] = [];

const getJoke = () => { 

  nextJokeButton?.setAttribute('disabled', '');

  fetch(urlJoke,header)
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
    document.getElementById('joke-text')!.innerHTML = currentJoke;
    nextJokeButton?.classList.add('d-none');
    scoringButtons?.classList.remove('d-none');
    nextJokeButton?.removeAttribute('disabled');

  })
  .catch((reject) => {

    console.log(reject)
    nextJokeButton?.removeAttribute('disabled');

  });
}
const jokeScore = (score:number) => {
  
  reportJokes.push({joke: currentJoke, score: score, date: new Date().toISOString()})
  scoringButtons?.classList.add('d-none');
  nextJokeButton?.classList.remove('d-none');
  console.log(reportJokes);

}