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

//inicia o servidor
app.listen(port, '0.0.0.0');

//exemplo de uso: localhost:3000/dadossensor/postDadosSensor?estadoUmidade=seco&estadoLuminosidade=bom
router.post('/postDadosSensor', function(req, res, next) {
    connection.query(`INSERT INTO dadossensor (estadoUmidade, data, estadoLuminosidade) VALUES ('${req.query.estadoUmidade}', '${Date.now()}', '${req.query.estadoLuminosidade}');`, function(err, results, fields) {
        if(err){
          console.log(err)
          res.send('Falha na inserção de dados');
        }
    });
  res.send('Dados inseridos com sucesso');
});

router.get('/getTodosDadosSensor', function(req, res, next) {
    connection.query("SELECT * FROM dadossensor", function(err, results, fields) {
        if(err){
          console.log(err);
          res.send('Erro ao coletar dados');
        }
        res.send(results);
    });
});

router.get('/getUltimoDadosSensor', function(req, res, next) {
    connection.query("SELECT * FROM dadossensor WHERE data IN (SELECT MAX(data) FROM dadossensor)", function(err, results, fields) {
        if(err){
          console.log(err);
          res.send('Erro ao coletar dados');
        }
        res.send(results)
    });
});

//exemplo de uso: localhost:3000/dadossensor/getDadosSensorPaginado?pagina=1
router.get('/getDadosSensorPaginado', function(req, res, next) {
    var numResultados = req.query.pagina * 15;
    connection.query(`SELECT * FROM dadossensor LIMIT ${numResultados}`, function(err, results, fields){
        if(err){
          console.log(err);
          res.send(err);
        }
        res.send(results);
    });
});

module.exports = router;