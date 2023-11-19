const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const todosRouter = require('./todos/todos.router');

const uri = 'mongodb://127.0.0.1:27017';

const app = express();
// mongoose.connect(`mongodb://127.0.0.1:27017/TodoAppDB`)
mongoose.connect(`${uri}/TodoAppDB`)
    .then(() => console.log('connected to DB - TodoAppDB'))
    .catch(err => console.log(err))

app.use(cors());
app.use(morgan('dev'));

app.use('/api/todos', todosRouter)

app.use(function (err, req, res, next) {
    res.status(400).json({ success: false, data: err.message })
})

app.listen(5001, () => console.log(`backend server is listening on 5001`))




