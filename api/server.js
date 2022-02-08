// implement your server here
// require your posts router and connect it here

const express = require('express');
const server = express();

server.use(express.json());

server.use('*', (req, res) => {
  res.status(404).send(`
    <p> Oops, we cannot find that resource</p>
  `)
})

module.exports = server;
