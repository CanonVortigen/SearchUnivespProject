const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    database: 'ProjetoUni',
    password: ''
  });

  connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

  module.exports = connection;
