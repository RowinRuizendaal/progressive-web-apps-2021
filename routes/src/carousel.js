const express = require('express');
const router = express.Router();
const api = require('../../modules/api');


let json;

router.get('/artist/:name', async (req, res) => {
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

  json = await api.fetchData(`search?q=${name}`);

  if (json.error) {
    console.log('error');
    return res.redirect('/');
  }

  dataset = json.data.map((el) => {
    return el;
  });

  if (json) {
    localStorage.setItem(name, JSON.stringify(dataset));
    return res.render('carousel.ejs', {
      data: dataset,
    });
  }
});


module.exports = router;
