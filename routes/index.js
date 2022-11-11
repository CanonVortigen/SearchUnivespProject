var conn = require('./../inc/db');
var express = require('express');
var contact = require('./../inc/contact');
var search = require('./../inc/search');
const { chart } = require('./../inc/search');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Projeto Integrador III' });
});

router.get('/contact', function(req, res, next) {
  contact.render(req, res);
});

router.post('/contact', function(req, res, next) {
 
  if (!req.body.name) {
    contact.render(req, res, 'Digite o seu nome');
  } else if (!req.body.phone) {
    contact.render(req, res, 'Digite o seu telefone');
  } else if (!req.body.email) {
    contact.render(req, res, 'Digite o seu email');
  } else if (!req.body.message) {
    contact.render(req, res, 'Digite a sua mensagem');
  } else {

    contact.save(req.body).then(results => {
      req.body = {};
      contact.render(req, res, null, "Mensagem enviada com sucesso!");

    }).catch(err=>{

      contact.render(req, res, err.message);

    });

  }

});

router.get('/result', function(req, res, next) {
  res.render('result', {
    title: 'Result - Projeto Integrador III'
  });
});

router.get('/search', function(req, res, next) {
  search.render(req, res);
});

router.get('/search/chart', function(req, res, next) {

  search.chart(req).then(chartData=>{

    res.send(chartData);

  });

});

router.post('/search', function(req, res, next) {
 
  if (!req.body.cep) {
    search.render(req, res, 'Digite o seu cep');
  } else if (!req.body.sexo) {
    search.render(req, res, 'Escolha o seu sexo');
  } else if (!req.body.classesocial) {
    search.render(req, res, 'Escolha a sua faixa etária');
  } else if (!req.body.pesquisageral) {
    search.render(req, res, 'Escolha o setor de investimento');
  } else {

    search.save(req.body).then(results => {

      req.body = {};
      search.render(req, res, null, "Cadastro efetuado com sucesso!");    

      
    }).catch(err=>{

      search.render(req, res, err.message);

    });

  }

});

module.exports = router;
