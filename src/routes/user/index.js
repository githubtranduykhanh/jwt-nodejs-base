import express from "express";
import apiUserController from "../../controllers/apiUserController";
const router = express.Router();


router.get('/read', apiUserController.readApi);
router.post('/create', apiUserController.createApi);
router.put('/update', apiUserController.updateApi);
router.delete('/delete', apiUserController.deleteApi);
   


export default router;