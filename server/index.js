const express = require('express');
const bodyParser = require('body-parser');
const {usersDb, depositsDb} = require('./modules/DB');
const app = express();
const log = require('./helpers/log');
const PUBLIC_DIR_NAME = __dirname + '/cordova/www/';

require('./modules/api')(app);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
const port = 3999;

app.use('/', express.static(PUBLIC_DIR_NAME));
app.get('/', (req, res) => res.sendFile(PUBLIC_DIR_NAME + 'index.html'));

app.listen(port, () => log.info('Server listening on port ' + port + ' http://localhost:' + port));
