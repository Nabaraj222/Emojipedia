const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser =  require('body-parser');
const path = require('path');
const connectDB = require('./assets/server/database/connection');

const app = express();

dotenv.config({path:'./.development.env'})
const PORT = process.env.PORT || 8080;
console.log(process.env.MONGO_URL);

// log requests
app.use(morgan('tiny'));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set('view engine', 'ejs');
//app.set('view', path.resolve(__dirname,'views/ejs'));

// load assets
app.use('/css', express.static(path.resolve(__dirname,'assets/css')));
app.use('/js', express.static(path.resolve(__dirname,'assets/js')));
app.use('/img', express.static(path.resolve(__dirname,'assets/img')));

// use routers
app.use('/', require('./assets/server/routes/router'));

app.listen(PORT, ()=>{console.log('Server is running on http://localhost:%s',PORT)});