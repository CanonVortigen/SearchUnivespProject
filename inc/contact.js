var conn = require("./db");

module.exports = {

    render(req, res, error, success){

        res.render('contact', {
            title: 'Contact - Projeto Integrador III',
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject)=>{

            conn.query(`
            
                INSERT INTO tb_contacts (name, phone, email, message)
                VALUES(?, ?, ?, ?)
            
            `, [
                fields.name,
                fields.phone,
                fields.email,
                fields.message
            ], (err, results)=>{

                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }

            });

        });

    }

};