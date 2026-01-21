import express, { Request, Response } from 'express';
import { UserController } from './user.controller';
const router = express.Router()
router.get("/users", UserController.createAdminController)
router.post("/users", UserController.createAdminController)

export const UserRouter = router