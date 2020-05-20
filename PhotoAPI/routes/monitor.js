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

router.post('/newMonitor', function(req, res, next) {
    connection.query(`INSERT INTO monitor (foto, apelido, especie) VALUES ('${req.body.foto}', '${req.body.apelido}', '${req.body.especie}');`, function(err, results, fields) {
        if(err){
          console.log(err)
          res.send('Falha na inserção de dados');
        }
    });
  res.send('Dados inseridos com sucesso');
});

router.get('/getMonitors', function(req, res, next) {
    connection.query(`SELECT * FROM monitor`, function(err, results, fields) {
        if(err){
          console.log(err)
          res.send('Falha na inserção de dados');
        } else {
          res.send(results);
        }
        
    });
});

module.exports = router;