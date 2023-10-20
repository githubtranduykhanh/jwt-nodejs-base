/**
 * config all web routes
 */

import express from "express";
import apiController from "../controllers/apiController";
import routesUser from "./user";
import apiUserController from "../controllers/apiUserController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.get('/', apiController.testApi);
    router.post('/register', apiController.handlRegister);
    router.post('/login', apiController.handlLogin);
    router.get('/user', apiUserController.listUser);
    return app.use('/api/v1', router);
};

export default initApiRoutes;