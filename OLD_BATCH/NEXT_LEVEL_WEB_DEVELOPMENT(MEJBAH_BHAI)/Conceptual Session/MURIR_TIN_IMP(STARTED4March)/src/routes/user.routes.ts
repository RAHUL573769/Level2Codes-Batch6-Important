import express from 'express';
import { UserController } from '../controller/user.controller';

const router = express.Router()
router.get("/get-user", UserController.getUser)

router.post("/create-user", UserController.createUser)


export const userRouter = router