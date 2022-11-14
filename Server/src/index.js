const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const {usersRouter} = require('./routes/usersRouter')
const {dashboardRouter} = require('./routes/dashboardRouter')
const {tasksRouter} = require('./routes/todo')

mongoose.connect('mongodb+srv://Zhyla:1234@cluster0.miqnuuj.mongodb.net/?retryWrites=true&w=majority')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/auth', usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/todo', tasksRouter)

const start = async () => {
    try {
        app.listen(8080);
        console.log('Server started at PORT: 8080 ')
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
};

start();

app.use(errorHandler);

function errorHandler(err, req, res) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
}
