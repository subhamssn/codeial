const express = require('express');
const router = require('./routes');
const path = require('path');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded());
const port = 8001;
app.use(cookieParser());


//use express router

app.use('/', require('./routes'));

//setup view engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


app.listen(port, function(err){
       if(err){
        console.log(`Error: ${err}`);
        return;
       }

       console.log(`Server is running properly on: `, port);
});