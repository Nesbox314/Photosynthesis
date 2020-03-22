var express = require('express');
var router = express.Router();
const app = express();
const port = 3005; //porta padrão
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '',
  database : 'photosynthesis'
});

router.get('/usuarios', function(req, res, next) {
    connection.query('')
});

module.exports = router;
