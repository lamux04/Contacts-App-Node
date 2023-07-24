const controller = {};

const connection = require('../lib/database');
const { processContact } = require('./home.controller');

controller.getEdit = async function (req, res) {
    if (!req.session.userid) { res.redirect('/login'); }
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    const result = await connection.query(sql, req.params.id);
    res.render('edit', {
        stylesheet: '/css/edit',
        contact: processContact(result[0])
    });
};

controller.postEdit = async function (req, res) {
    // Eliminamos
    const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, phoneNumber = ?, address = ?, birthday = ? WHERE id = ?';
    await connection.query(sql, [
        req.body.firstname,
        req.body.lastname,
        (req.body.phoneNumber === '') ? null : req.body.phoneNumber,
        (req.body.address === '') ? null : req.body.address,
        (req.body.birthday === '') ? null : req.body.birthday,
        Number(req.params.id)
    ]);

    res.redirect('/home');
};

module.exports = controller;
