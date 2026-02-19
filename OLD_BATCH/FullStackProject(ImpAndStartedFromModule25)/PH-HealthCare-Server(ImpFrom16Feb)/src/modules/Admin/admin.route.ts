import express, { Request, Response } from 'express';
import { AdminController } from './admi.controller';


const router = express.Router()

router.get("/", AdminController.getAdminData)
router.get("/:id", AdminController.getSpecificAdmin)
router.patch("/:id", AdminController.updateSpecificAdmin)
router.delete("/:id", AdminController.deleteFromDb)
export const AdminRouter = router