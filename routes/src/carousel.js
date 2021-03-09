const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/artist/:name', (req, res) => {
  const name = req.params.name;

  if (typeof localStorage === 'undefined' || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }


  if (localStorage.getItem(name)) {
    return res.render('carousel.ejs', {
      data: JSON.parse(localStorage.getItem(name)),
    });
  }

  const options = {
    method: 'GET',
    url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`,
    headers: {
      'x-rapidapi-key': process.env.KEY,
      'x-rapidapi-host': process.env.HOST,
    },
  };

  axios.request(options).then(function(response) {
    console.log(response.data);
    res.render('carousel.ejs', {
      data: response.data.data,
    });
    localStorage.setItem(name, JSON.stringify(response.data.data));
  }).catch(function(error) {
    console.error(error);
  });
});


module.exports = router;
