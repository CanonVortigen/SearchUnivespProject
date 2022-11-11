var conn = require("./db");

module.exports = {

    render(req, res, error, success){

        res.render('search', {
            title: 'Search - Projeto Integrador III',
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject)=>{

            conn.query(`
            
                INSERT INTO tb_search (cep, cidade, uf, bairro, sexo, classesocial, pesquisageral)
                VALUES(?, ?, ?, ?, ?, ?, ?)
            
            `, [

                fields.cep,
                fields.cidade,
                fields.uf,
                fields.bairro,
                fields.sexo,
                fields.classesocial,
                fields.pesquisageral

            ], (err, results)=>{

                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }

            });

        });

    },

    chart(req){

        return new Promise((resolve, reject)=>{

            conn.query(`
            
            SELECT pesquisageral, COUNT(pesquisageral) AS total 
            FROM tb_search
            GROUP BY pesquisageral;               
                    
            
            `, (err, results)=>{

                if (err) {

                    reject(err);

                } else {

                    //let ceps = [];
                    //let cidades = [];
                    //let ufs = [];
                    //let bairros = [];
                    //let sexos = [];
                    //let classesociais = [];
                    let pesquisagerais = [];
                    let totais = [];

                    results.forEach(row=>{

                        //ceps.push(row.cep);
                        //cidades.push(row.cidade);
                        //ufs.push(row.uf);
                        //bairros.push(row.bairro);
                        //sexos.push(row.sexo);
                        //classesociais.push(row.classesocial);
                        pesquisagerais.push(row.pesquisageral);
                        totais.push(row.total);
                       
                    });                   

                    resolve({

                        //ceps,
                        //cidades,
                        //ufs,
                        //bairros,
                        //sexos,
                        //classesociais,
                        pesquisagerais,
                        totais

                    });

                }

            });

        });

    }
};