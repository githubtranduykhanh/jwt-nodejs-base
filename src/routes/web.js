/**
 * config all web routes
 */

import express from "express";
import homepageController from "../controllers/homepageController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homepageController.getHomepage);
    router.post('/users/create', homepageController.postUsersCreate);
    router.post('/users/delete/:id', homepageController.postUsersDelete);
    router.post('/users/update', homepageController.postUsersUpdate);
    router.get('/users/update/:id', homepageController.getUsersUpdateById);  
    return app.use('/', router);
};

export default initWebRoutes;