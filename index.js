require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();
const compression = require('compression');

const port = process.env.PORT || 3000;


app.use(router);
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(`${__dirname}/public`));
app.use(compression());


app.set('view engine', 'ejs');
app.set('views', 'view');


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
