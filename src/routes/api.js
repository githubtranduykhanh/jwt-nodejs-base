/**
 * config all web routes
 */

import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.get('/', apiController.testApi);
    router.post('/register', apiController.handlRegister);
    router.post('/login', apiController.handlLogin);
    return app.use('/api/v1', router);
};

export default initApiRoutes;