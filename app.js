// app.js

const express = require('express');
const app = express();
const newsRouter = require('./routes/news');

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use('/', newsRouter);

module.exports = app;

