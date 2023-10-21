import express from "express";
import apiController from "../../controllers/apiController";
const router = express.Router();



router.post('/register', apiController.handlRegister);
router.post('/login', apiController.handlLogin);
   


export default router;