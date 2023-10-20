import express from "express";
import apiUserController from "../../controllers/apiUserController";
const router = express.Router();

const routesUser = () => {
    router.get('/', apiUserController.listUser);
    return router;
};

export default routesUser;