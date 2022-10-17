const urlJoke:string = "https://icanhazdadjoke.com/dsf";
const header:object ={
  method: 'get',
  headers: {
    'Accept': 'application/json'
  },
}

const getJoke = ():void => { 
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
  .then((request) => console.log(request.joke))
  .catch((reject) => console.log(reject));
}
