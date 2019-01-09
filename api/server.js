const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

// middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());

// routes
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

// export server
module.exports = server;
