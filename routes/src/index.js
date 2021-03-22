const express = require('express');
const router = express.Router();
const api = require('../../modules/api');
const utils = require('../../modules/utils');
let useStorage = '';


const data = [];
let json;

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  useStorage = new LocalStorage('./scratch');
}

router.get('/', async (req, res) => {
  if (useStorage.getItem('index')) {
    return res.render('index.ejs', {
      data: JSON.parse(useStorage.getItem('index')),
      rerender: false,
    });
  }

  for (let i = 0; i < 7; i++) {
    json = await api.fetchData(`artist/${i}`);

    if (typeof json === 'object') {
      data.push(json);
    } else {
      data = await json.map((el) => {
        return el;
      });
    }
  };


  if (json.error) {
    return res.render('index.ejs', {
      data: JSON.parse(useStorage.getItem('index')),
      rerender: false,
    });
  }

  if (json) {
    useStorage.setItem('index', JSON.stringify(data));
    return res.render('index.ejs', {
      data: data,
      rerender: false,
    });
  }
});


router.post('/app', async (req, res) => {
  const postvalue = req.body.value;

  // If artist has already been searched
  if (useStorage.getItem(postvalue)) {
    return res.render('index.ejs', {
      data: JSON.parse(useStorage.getItem(postvalue)),
    });
  }

  json = await api.fetchData(`search?q=${postvalue}`);

  if (json.error) {
    return res.render('index.ejs', {
      data: JSON.parse(useStorage.getItem('index')),
      rerender: false,
    });
  }

  json.data.map((el) => {
    return el;
  });

  const formatStructure = utils.formatData(json.data);
  const uniqueArray = utils.filterArray(formatStructure);

  if (json && !json.error) {
    useStorage.setItem('index', JSON.stringify(uniqueArray));
    return res.render('index.ejs', {
      data: uniqueArray,
      rerender: false,
    });
  }
});

module.exports = router;
