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

//exemplo de uso: localhost:3000/umidade/postUmidade?estadoUmidade=seco&estadoLuminosidade=bom
router.post('/postUmidade', function(req, res, next) {
    connection.query(`INSERT INTO umidade (estadoUmidade, data, estadoLuminosidade) VALUES ('${req.query.estadoUmidade}', '${Date.now()}', '${req.query.estadoLuminosidade}');`, function(err, results, fields) {
        if(err){
          console.log(err)
          res.send('Falha na inserção de dados');
        }
    });
  res.send('Dados inseridos com sucesso');
});

router.get('/getTodasUmidade', function(req, res, next) {
    connection.query("SELECT * FROM umidade", function(err, results, fields) {
        if(err){
          console.log(err);
          res.send('Erro ao coletar dados');
        }
        res.send(results);
    });
});

router.get('/getUltimaUmidade', function(req, res, next) {
    connection.query("SELECT * FROM umidade WHERE data IN (SELECT MAX(data) FROM umidade)", function(err, results, fields) {
        if(err){
          console.log(err);
          res.send('Erro ao coletar dados');
        }
        res.send(results)
    });
});

//exemplo de uso: localhost:3000/umidade/getUmidadePaginada?pagina=1
router.get('/getUmidadePaginada', function(req, res, next) {
    var numResultados = req.query.pagina * 15;
    connection.query(`SELECT * FROM umidade LIMIT ${numResultados}`, function(err, results, fields){
        if(err){
          console.log(err);
          res.send(err);
        }
        res.send(results);
    });
});

module.exports = router;
