var express = require('express');
var router = express.Router();
const app = express();
const port = 3005; //porta padrão
const mysql = require('mysql');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '',
  database : 'middleware'
});

//inicia o servidor
app.listen(port, '0.0.0.0');

router.get('/umidadeAgora', function (req, res) {
  
  connection.query('SELECT * FROM umidade', function (error, results, fields) {
    console.log(results);
    res.send(results);
  })
});

module.exports = router;