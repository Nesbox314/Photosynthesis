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
  database : 'photosynthesis',
  multipleStatements: true
});

router.post('/postPlant', function(req, res, next) {
    connection.query(`INSERT INTO social (foto, nomePlanta, especie, idade) VALUES ('${req.body.foto}', '${req.body.nomePlanta}', '${req.body.especie}', '${req.body.idade}');`, function(err, results, fields) {
        if(err){
          console.log(err)
          res.send('Falha na inserção de dados');
        }
    });
  res.send('Dados inseridos com sucesso');
});

module.exports = router;