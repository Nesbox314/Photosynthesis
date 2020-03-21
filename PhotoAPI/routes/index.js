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

//exemplo de rota: localhost:3000/postUmidade?estadoUmidade=seco&estadoLuminosidade=bom
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



module.exports = router;
