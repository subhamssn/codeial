const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/codeial_development';
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind('Error connecting to DB'));

db.once('open', function(){
    console.log('Connected to the database successfully!');
})