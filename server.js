'use strict';
const express = require('express');
const HOST = '0.0.0.0';
const app = express();

app.use(express.static('dist'));
app.listen(process.env.PORT || 4000, HOST);

console.log(`Running on http://${HOST}:4000`);