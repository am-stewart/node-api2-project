// implement your server here
// require your posts router and connect it here

const express = require('express');
const server = express();

const postsRouter = require('./posts/posts-router');

server.use(express.json());

server.use('/api/posts', postsRouter);

server.use('*', (req, res) => {
  res.status(404).send(`
    <p> Oops, we cannot find that resource</p>
  `)
})

module.exports = server;
