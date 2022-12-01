const express = require('express');
const usersRoutes = require('./routes/users.routes');
const categoriesRoutes = require('./routes/categories.routes');

// ...

const app = express();

app.use(express.json());

app.use('/', usersRoutes);

app.use('/', categoriesRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
