const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/artist/:name', async (req, res) => {
  const name = req.params.name;
  const data = [];
  let json;

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

  json = await axios.request(options).then(function(response) {
    data.push(response.data);
    return response.data;
  }).catch(function(error) {
    console.error(error);
  });

  // if there is a error provide feedback
  if (json.error) {
    console.log('error');
    return res.redirect('/');
  }

  // If json is sucessfully fetched
  if (json && !json.error) {
    console.log(data[0].data);
    res.render('carousel.ejs', {
      data: data[0].data,
    });
    return localStorage.setItem(name, JSON.stringify(data[0].data));
  }
});


module.exports = router;
