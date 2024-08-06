const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('On my way to be a Supra Coder');
});

const userRoute = require('./routes/users');
const inventoryRoute = require('./routes/inventory');

app.use('/user', userRoute);
app.use('/inventory', inventoryRoute);

module.exports = app;
