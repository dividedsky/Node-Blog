const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// MIDDLEWARE
module.exports = server => {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors());
};
