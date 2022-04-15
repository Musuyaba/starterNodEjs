const express = require("express");
const morgan = require("morgan");
const bodyParser = express;

// Import and connect database connection
const connectDB = require('./app/database/connection');
connectDB();

const app = express(); 
const PORT = 8000;

// Using engine ejs
app.set('view engine', 'ejs');
app.set('views', './app/views')

// log request
app.use(morgan('tiny'));

// Use body parser express
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

// Import and use api Router
const apiRouter = require('./app/routes/apiRoutes');
app.use('/api', apiRouter);

//Import and use web router
const webRouter = require('./app/routes/webRoutes');
app.use('/', webRouter);

// running webserver 
app.listen(PORT, '0.0.0.0', function(){
    console.log('Server running on port '+ PORT);
})