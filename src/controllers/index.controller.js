const controller = {};

controller.getIndex = function (req, res) {
    res.redirect('/login');
};

module.exports = controller;
