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

router.post('/postUsuarios', function(req, res, next) {
  
  console.log(req.body);
  connection.query(`INSERT INTO users (nome, email, senha) VALUES ('${req.body.nome}', '${req.body.email}', '${req.body.senha}');`, function(err, results, fields) {
      if(err){
        console.log(err)
        res.send('Falha na inserção de dados');
      }
  });
  console.log('Dados inseridos com sucesso');
res.send('Dados inseridos com sucesso');
});

module.exports = router;
