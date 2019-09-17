const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors');

const mongoose = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
mongoose.set('useFindAndModify', false);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', require('./routes/tasks.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
})