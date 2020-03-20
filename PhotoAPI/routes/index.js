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
  database : 'photoapi'
});

//inicia o servidor
app.listen(port, '0.0.0.0');

//pronto para colocação de rotas

module.exports = router;
