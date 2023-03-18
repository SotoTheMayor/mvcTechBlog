const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: 'You dont know this',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
app.use(routes);

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
