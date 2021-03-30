# Single page app - Check out your favorite songs from your favorite Artist!


![image](https://raw.githubusercontent.com/RowinRuizendaal/web-app-from-scratch-2021/master/assets/documentation/home.jpg)

![image](https://raw.githubusercontent.com/RowinRuizendaal/web-app-from-scratch-2021/master/assets/documentation/teaser.png)


[Live demo](https://rowinruizendaal.github.io/web-app-from-scratch-2021/)


## Description

I made a single page app for music lovers in which I used the Rapid API (Deezer) API, this allows me to take a look at the current songs of an artist. 


## What can you do with this web app?

Ever had that moment where you like a song of any artist but you dont know any other songs from that artist? With this tool you can search on any artist and view all their music previews within just a 2 steps.

Fill in their artist name,

Click on the desired artist

All their songs are within one simple overview carousel



## What does this app need to be a perfect app from now on?

Like feature to save any songs from your favorite artist,

Better API connection with limitless calls

## NPM scripts

```js
npm run dev : "build": "rollup -c"
```

```js
npm run start : "npm run build && node ./dist/index.js"
```

```js
npm run dev: "npm run build && nodemon ./dist/index.js"
```

The build script will make a new directory within the project itself called: dist, the dist folder is structured as followed:

```js
- Public/
- scratch/
- view/

index.js

```
For this I am using rollup with a rollup.config.js:

```js
export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
      // Delete the existing dist folder if exist
    del({
      targets: 'dist/*',
    }),
    copy({
        // Copy public folder to dist
      targets: [{
        src: 'public/*',
        dest: 'dist/public',
      },
      {
        src: 'view',
        dest: 'dist',
      },
      {
        src: 'scratch',
        dest: 'dist',
      },
      {
        // Minify public css with cleanCSS
        src: 'public/css/*',
        dest: 'dist/public/css',
        transform: (contents) => new CleanCSS().minify(contents).styles,
      },
      {
        // Minify javascript file with uglify
        src: 'public/swiper-interaction.js',
        dest: 'dist/public',
        transform: () => uglify.minify(fs.readFileSync(path.join(__dirname, 'public', 'swiper-interaction.js'), 'utf8'), {}).code,
      },
      {
        // Minify javascript file with uglify
        src: 'public/service-worker.js',
        dest: 'dist/public',
        transform: () => uglify.minify(fs.readFileSync(path.join(__dirname, 'public', 'service-worker.js'), 'utf8'), {}).code,
      },
      ],
    }),
    commonjs(),
    purgecss({
      content: ['**/*.html'],
      css: ['**/*.css'],
    }),
  ],
  // External packages
  external: ['express', 'path', 'axios', 'ejs'],
};
```

Then the script will execute the index.js file within the dist folder


## Caching strategy

This project can also work offline with the help of a service worker which is based on a caching strategy:

Service worker

Every reponse (HTML, CSS & javascript) will be cached within the bufferstorage from the browser itself, the files that are being cached are:

```js
const urlsToCache = [
  '/offline',
  '/css/style.css',
  '/css/swiper-bundle.css',
  '/swiper.js',
  '/swiper-interaction.js',
];
```

![offline](https://raw.githubusercontent.com/RowinRuizendaal/progressive-web-apps-2021/master/docs/img/offline.png)

```js
import { formatData } from '../utils/formatData.js'
import { filterArray } from '../utils/FilterArray.js'


const formatStructure = formatData(json.data)
const uniqueArray = filterArray(formatStructure)

```

[FormatData.js](https://github.com/RowinRuizendaal/web-app-from-scratch-2021/blob/master/js/modules/utils/formatData.js)
```js
export function formatData(array) {

    return array.map((el) => {
        return {
            id: el.artist.id,
            name: el.artist.name,
            picture_medium: el.artist.picture_medium,
            type: el.type
        }
    })
}
```

[FilterArray.js](https://github.com/RowinRuizendaal/web-app-from-scratch-2021/blob/master/js/modules/utils/FilterArray.js)


```js
export function filterArray(array) {

    const unique = array.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    return unique
}
```


## What is the Rapid deezer API?

What is an API? Application programming interfaces (APIs) helps to make data available for extern users. In this way, you can request data to use it in different applications.

[The Rapid Deezer API](https://rapidapi.com/deezerdevs/api/deezer-1):

    - Search on artist
    - Search on album.
    - Get comments
    - Get Genre
    - Get Artist
    - Get Ediorial
    - Get Playlist
    - Get Track
    - Get Radio
    - Get Infos

## How many request are allowed?

I couldn't find any information about the maxium request each hour/day, the API will timeout for some times if the api is getting called to many times, these timeout are not rate limits since you are able to fetch data within seconds after it.


## How to fetch data from the Rapid Deezer API?

```js
import { config } from './config.js'

//Fetch method
export async function fetchData(endpoint1) {
    const endpoint = endpoint1

    const dataset = await fetch(`${config.baseUrl}${endpoint}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": `${config.key}`,
            "x-rapidapi-host": `${config.host}`
        }
    })
    const json = await dataset.json()
    return json
}


```
