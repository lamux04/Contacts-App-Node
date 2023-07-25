const controller = {};

const connection = require('../lib/database');
const { processContact } = require('./home.controller');

controller.getEdit = async function (req, res) {
    if (!req.session.userid) { res.redirect('/login'); }
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    let result = await connection.query(sql, req.params.id);
    const birthday = result[0].birthday;
    result = result[0];
    if (birthday) { result.birthday2 = birthday.getFullYear() + '-' + ((birthday.getMonth() + 1) <= 9 ? '0' + (birthday.getMonth() + 1) : (birthday.getMonth() + 1)) + '-' + (birthday.getDate() <= 9 ? '0' + birthday.getDate() : birthday.getDate()); }
    result = processContact(result);
    res.render('edit', {
        stylesheet: '/css/edit',
        contact: result
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
