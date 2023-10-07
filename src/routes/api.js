/**
 * config all web routes
 */

import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.get('/', apiController.testApi);
      
    return app.use('/api/v1', router);
};

export default initApiRoutes;