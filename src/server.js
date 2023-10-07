import express from 'express';
import viewEngine from "./configs/viewEngine";
import allWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import allApiRoutes from './routes/api';

//import connection from './configs/connectDB'
require('dotenv').config();

const app = express();

//config view engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//init all web routes
allWebRoutes(app);

//init all api routes
allApiRoutes(app);

app.listen(port, () => {
    console.log('NodeJSServer is running at the port : ' + port);
})