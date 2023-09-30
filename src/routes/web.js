/**
 * config all web routes
 */

import express from "express";
import homepageController from "../controllers/homepageController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homepageController.getHomepage);
    
    return app.use('/', router);
};

export default initWebRoutes;