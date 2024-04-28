const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');

const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(
    cors,
    bodyParser.json(),
    express.static(path.join(__dirname, 'public')),
    usersRouter,
    gamesRouter,
    categoriesRouter
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});

// git add .
// git commit -m
// git push