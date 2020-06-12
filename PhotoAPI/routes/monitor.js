var express = require('express');
var router = express.Router();
const app = express();
const port = 3005; //porta padrão
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'photosynthesis',
  multipleStatements: true
});

router.post('/newMonitor', function (req, res, next) {
  connection.query(`INSERT INTO monitor (foto, apelido, especie, user) VALUES ('${req.body.foto}', '${req.body.apelido}', '${req.body.especie}', '${req.body.user}');`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    }
    res.send("InsertId:" + results.insertId);
  });
});

router.get('/getMonitors', function (req, res, next) {
  connection.query(`SELECT * FROM monitor WHERE user = '${req.query.user}'`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    } else {
      res.send(results);
    }
  });
});

router.post('/editMonitor', function (req, res, next) {
  connection.query(`UPDATE monitor SET apelido = '${req.body.apelido}', especie = '${req.body.especie}', foto = '${req.body.foto}' where id = '${req.body.id}'`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    } else {
      res.send(results);
    }
  });
});

router.get('/getMonitorById', function (req, res, next) {
  connection.query(`SELECT * FROM monitor WHERE id='${req.query.id}'`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    } else {
      res.send(results);
    }
  });
});

router.get('/deleteMonitor', function (req, res, next) {
  connection.query(`DELETE FROM dadossensor WHERE monitor='${req.query.id}';` + `DELETE FROM monitor WHERE id='${req.query.id}'`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    } else {
      res.send(results);
    }
  });

});

router.get('/getMonitorsWithSensorData', function (req, res, next) {
  connection.query(`
  SELECT monitor.*, 
  (SELECT dadossensor.estadoUmidade FROM dadossensor WHERE monitor.id = dadossensor.monitor 
    ORDER BY dadossensor.id DESC LIMIT 1) AS estadoUmidade FROM monitor where monitor.user = '${req.query.user}'`, function (err, results, fields) {
    if (err) {
      console.log(err)
      res.send('Falha na inserção de dados');
    } else {
      res.send(results);
    }
  });
});

module.exports = router;