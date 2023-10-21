/**
 * config all web routes
 */

import express from "express";
import routesUser from "./user";
import routerLoginRegister from "./loginRegister";
const router = express.Router();

const initApiRoutes = (app) => {

    app.use('/api/v1', routerLoginRegister)
    app.use('/api/v1/user',routesUser)
    return app;
};

export default initApiRoutes;