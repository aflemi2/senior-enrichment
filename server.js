const server = require('http').createServer(require('./app'));
const db = require('./db');

const port = process.env.PORT || 3000;
server.listen( port, ()=> console.log(`Listening on port ${port}`));

db.syncAndSeed();
