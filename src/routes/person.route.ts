import { Request, Response, Router } from "express";
import { PersonController } 
    from "../controllers/person.controller";

const router: Router = Router();
const personController = new PersonController();

// 1. Get All - persons (replace app with router)
router.get("/get/all", personController.getAllPersons);

export default router;