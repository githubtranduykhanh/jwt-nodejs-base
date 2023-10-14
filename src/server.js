import express from 'express';
import viewEngine from "./configs/viewEngine";
import allWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import allApiRoutes from './routes/api';
import configCors from './configs/configCors'

//import connection from './configs/connectDB'
require('dotenv').config();

const app = express();

//config view engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

//config cors
configCors(app);


//init all web routes
allWebRoutes(app);

//init all api routes
allApiRoutes(app);

app.listen(port, () => {
    console.log('NodeJSServer is running at the port : ' + port);
})