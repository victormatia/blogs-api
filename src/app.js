const express = require('express');
const usersRoutes = require('./routes/users.routes');

// ...

const app = express();

app.use(express.json());

app.use('/', usersRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
