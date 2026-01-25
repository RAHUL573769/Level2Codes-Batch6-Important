import express from 'express';
import { UserController } from './user.controller';
const router = express.Router()
router.get("/users", UserController.getAdminController)

router.get("/users/:id", UserController.getAdminByIdController)
router.patch("/users/:id", UserController.updateAdminController)
router.patch("/users/:id", UserController.updateAdminController)
router.delete("/users/:id", UserController.updateAdminController)
router.post("/users", UserController.createAdminController)

export const UserRouter = router