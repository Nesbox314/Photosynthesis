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
  connection.query(`INSERT INTO users (nome, email, senha, foto) VALUES ('${req.body.nome}', '${req.body.email}', '${req.body.senha}', '${req.body.foto}');`, function(err, results, fields) {
      if(err){
        console.log(err)
        res.send('Falha na inserção de dados');
      }
  });
  console.log('Dados inseridos com sucesso');
res.send('Dados inseridos com sucesso');
});

router.get('/getTodosUsuarios', function(req, res, next) {
  connection.query(`SELECT email, senha FROM users`, function(err, results, fields) {
      if(err){
        console.log(err)
        res.send('Falha na inserção de dados');
      }
  res.send(results);
  });
});

router.get('/getUsuariosByLogin', function(req, res, next) {
  var email = req.query.user;
  var senha = req.query.senha;
  connection.query(`SELECT id, nome, email FROM users WHERE email = '${email}' and senha = '${senha}'`, function(err, results, fields) {
      if(err){
        console.log(err)
        res.send('Falha na inserção de dados');
      }
      res.send(results);
  });
});

router.get('/getUserDate', function(req, res, next) {
  connection.query(`SELECT * FROM users WHERE id = '${req.query.id}'`, function(err, results, fields) {
      if(err){
        console.log(err)
        res.send('Falha na inserção de dados');
      }
      res.send(results);
  });
});

module.exports = router;
