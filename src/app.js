// Dependencias
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();

// Modulos importados
const { freePort } = require('./lib/free-port');

// html and css (handlebars)
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static public
app.use(express.static(path.join(__dirname, 'public')));

// session manager
app.use(sessions({
    secret: 'secretCode',
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    resave: false
}));

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/login.routes'));
app.use(require('./routes/home.routes'));
app.use(require('./routes/edit.routes'));
app.use(require('./routes/perfil.routes'));
app.use(require('./routes/api.routes'));

// Iniciar servidor
freePort(3000)
    .then(port => {
        app.listen(port, () => console.log(`Connection realized on http://localhost:${port}`));
    });
