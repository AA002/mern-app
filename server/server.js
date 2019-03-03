const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/api/users');
const messagesRoutes = require('./routes/api/messages');

const app = express();

require('dotenv').config();

//DB
const db = require('./config/keys').MongoURI;

//Mongo connect
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err));

const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hi');
});

app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);

app.listen(port, () => console.log(`server listening on ${port}`));