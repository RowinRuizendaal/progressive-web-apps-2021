const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(require('./routes/router'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'view');

app.use(function(req, res, next) {
  res.status(404);
  res.render('index.ejs');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
