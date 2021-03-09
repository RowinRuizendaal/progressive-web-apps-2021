const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');


let data = new Array
let json

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.get('/', async (req, res) => {

    if (localStorage.getItem('index')) {
        return res.render('index.ejs', {
            data: JSON.parse(localStorage.getItem('index')),
            rerender: false
        })
    }


    for (let i = 0; i < 2; i++) {

        const options = {
            method: 'GET',
            url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${i}`,
            headers: {
                'x-rapidapi-key': process.env.KEY,
                'x-rapidapi-host': process.env.HOST,
            }
        }

        json = await axios.request(options).then(function(response) {
            data.push(response.data)
            return response.data
        }).catch(function(error) {
            console.error(error);
        });
    }
    if (json) {
        localStorage.setItem('index', JSON.stringify(data));
        return res.render('index.ejs', {
            data: data,
            rerender: false
        })
    }
});

router.post('/app', async (req, res) => {
    const postvalue = req.body.value;


    if (localStorage.getItem(postvalue)) {
        return res.render('index.ejs', {
            data: JSON.parse(localStorage.getItem(postvalue))
        })
    }

    const options = {
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${postvalue}`,
        headers: {
            'x-rapidapi-key': process.env.KEY,
            'x-rapidapi-host': process.env.HOST,
        }
    }

    json = await axios.request(options).then(function(response) {
        if (response.data.error) {
            return res.render('index.ejs', {
                data: JSON.parse(localStorage.getItem('index')),
                rerender: false
            })
        }
        data.push(response.data)
        return response.data
    }).catch(function(error) {
        console.error(error);
    });

    json.data.map((el) => {
      return el
  })

  console.log(json)

    if (json) {
        console.log(json)
        localStorage.setItem('index', JSON.stringify(data));
        return res.render('index.ejs', {
            data: data,
            rerender: true
        })
    }




})

module.exports = router;