const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const modelAutor = require('./model/models/Autor')
const routerAutor = require('./router/autor');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routerAutor);

app.listen(3001, () => {
  console.log('>>> run server.');
});

module.exports = app

