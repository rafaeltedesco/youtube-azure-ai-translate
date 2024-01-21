const express = require('express');
const aiTranslateController = require('./controllers/aiTranslate');

const app = express();
app.use(express.json());

app.post('/', aiTranslateController.getExamples);

module.exports = app;