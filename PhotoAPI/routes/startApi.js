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

let createTables = 
    `create table if not exists dadossensor(
        id int(100) primary key auto_increment not null,
        estadoUmidade varchar(100) not null,
        estadoLuminosidade varchar(100) not null,
        data varchar(100) not null
    );
    create table if not exists users(
        id int(11) primary key auto_increment not null,
        email varchar(100) not null,
        foto BLOB,
        nome varchar(100) not null,
        senha varchar(100) not null
    )`;
  
  router.get('/createTables', function(req, res, next) {
    connection.query(createTables, function(err, results, fields) {
      if(err){
          console.log(err);
      } else {
        res.sendStatus(200);
      }
    });
})

module.exports = router;