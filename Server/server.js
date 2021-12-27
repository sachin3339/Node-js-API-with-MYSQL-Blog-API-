const http = require('http');
const app = require('./app');
const port = 3030;

const server = http.createServer(app);

server.listen(port);