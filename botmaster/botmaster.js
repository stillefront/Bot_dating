var app = require('../app');
//const http = require('http');
const Botmaster = require('botmaster');

//const myServer = http.createServer(app);
//const port = 3000;

const botmasterSettings = { app: app };

const botmaster = new Botmaster(botmasterSettings);

console.log(`Running App on port: `);

botmaster.on('server running', (message) => {
    console.log("it works!");
  });