const mongoose = require('mongoose');

const URI = 'mongodb://localhost/many-tasks';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err));

module.exports = mongoose;