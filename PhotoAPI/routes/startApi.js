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

let createTableSocial = `create table if not exists social(
      id int(11) primary key auto_increment not null,
      foto longtext,
      nomePlanta varchar(100),
      especie varchar(100),
      idade varchar(5),
      user int(11),
      FOREIGN KEY (user) REFERENCES users(id)
  )`;

let createTableUsers = `create table if not exists users(
    id int(11) primary key auto_increment not null,
    email varchar(100) not null,
    foto longtext,
    nome varchar(100) not null,
    senha varchar(100) not null
  );`;

let createTableDadosSensor = `create table if not exists dadossensor (
    id int(11) primary key auto_increment not null,
    estadoUmidade varchar(100) not null,
    estadoLuminosidade varchar(100) not null,
    data varchar(100) not null,
    monitor int(11),
    FOREIGN KEY (monitor) REFERENCES monitor(id)
  );`;

let createTableMonitor = `create table if not exists monitor (
    id int(11) primary key auto_increment,
    apelido varchar(100) not null,
    especie varchar(100) not null,
    foto longtext,
    user int(11),
    FOREIGN KEY (user) REFERENCES users(id)
  );`;

router.get('/createTables', function (req, res, next) {
  connection.query(createTableUsers + createTableMonitor + createTableDadosSensor + createTableSocial, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
})

module.exports = router;