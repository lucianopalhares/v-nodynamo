const express = require('express');
const morgan = require('morgan');
const routes = require('../server/src/routes/api');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(
express.urlencoded({
    extended: false,
}),
);
app.use(routes);
app.listen(3000, () => console.log('Ok'));
