const fetch = require('node-fetch');

async function fetchAsyncLocation() {
  let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=denver,co&key=AIzaSyCxsZ6ZwtaVGwlsIsnRL5F7nZuof2nvKAE');
  let posts = await response.json();
  return posts;
}

// This is how we use our async function
fetchAsyncLocation()
    .then(data => console.log(data.results[0].geometry.location))
    .catch(reason => console.log(reason.message))
