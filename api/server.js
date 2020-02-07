const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//Include routers/middlewares
const authRouter = require('../auth/auth-router.js');

const usersRouter = require('../users/users-router.js');
const sleepLogRouter = require('../sleepLog/sleepLog-router.js');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ test:"Success" });
  });



  //Server.use

  server.use('/api/auth', authRouter);
  server.use('/api/users', usersRouter, sleepLogRouter);
//   server.use('/api/users/:id', usersRouter, sleepLogRouter);

  module.exports = server;