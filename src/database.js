const mongoose = require('mongoose');

const mongoSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect('mongodb://localhost/simplejwt', mongoSettings);
const conn = mongoose.connection;

conn.once('open', () => {
    console.log('DB is connected');
});