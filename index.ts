const urlJoke:string = "https://icanhazdadjoke.com/";
const header:object ={
  method: 'get',
  headers: {
    'Accept': 'application/json'
  },
}

const getJoke = () => { 
  fetch(urlJoke,header)
  .then((resolve) => {
    if (resolve.ok) {
      
      let joke:string; 
      return resolve.json();
    }
    throw {
      statusText: resolve.statusText,
      status: resolve.status
    };
  })
  .then((request) => {
    document.getElementById('joke-text')!.innerHTML = request.joke;
  })
  .catch((reject) => console.log(reject));
}
