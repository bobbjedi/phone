const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const log = require('./helpers/log');
const DIR_NAME = __dirname + '/cordova/www/';

require('./modules/api')(app);
require('./modules/cron');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
const port = 3030;

app.use('/', express.static(DIR_NAME));
app.get('/', (req, res) => res.sendFile(DIR_NAME + 'index.html'));

app.listen(port, () => log.info('Server listening on port ' + port + ' http://localhost:' + port));
