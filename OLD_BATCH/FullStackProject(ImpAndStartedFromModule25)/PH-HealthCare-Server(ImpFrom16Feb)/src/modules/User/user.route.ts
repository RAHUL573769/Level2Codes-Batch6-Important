import express from 'express';
import { userController } from './user.controller';


const router = express.Router()
router.post("/", userController.createAdminController)

export const userRouter = router