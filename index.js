const express = require("express");
const morgan = require("morgan");
const bodyParser = express;

// Import and connect database connection
const connectDB = require('./app/database/connection');
connectDB();

const app = express(); 
const PORT = 8000;

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



// running webserver 
app.listen(PORT, '0.0.0.0', function(){
    console.log('Server running on port '+ PORT);
})