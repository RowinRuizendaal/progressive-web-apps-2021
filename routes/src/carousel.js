const express = require('express');
const router = express.Router();
const api = require('../../modules/api');
let useStorage = '';

let json;

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  useStorage = new LocalStorage('./scratch');
}


router.get('/artist/:name', async (req, res) => {
  const name = req.params.name;


  if (useStorage.getItem(name)) {
    return res.render('carousel.ejs', {
      data: JSON.parse(useStorage.getItem(name)),
    });
  }

  json = await api.fetchData(`search?q=${name}`);

  if (json.error) {
    console.log('error');
    return res.redirect('/');
  }

  let dataset = json.data.map((el) => {
    return el;
  });

  if (json) {
    useStorage.setItem(name, JSON.stringify(dataset));
    return res.render('carousel.ejs', {
      data: dataset,
    });
  }
});


module.exports = router;
