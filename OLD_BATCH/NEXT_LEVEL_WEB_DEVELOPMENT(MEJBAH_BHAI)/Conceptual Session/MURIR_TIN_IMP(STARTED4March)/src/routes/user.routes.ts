import express from 'express';
import { UserController } from '../controller/user.controller';

const router = express.Router()

router.post("/create-user", UserController.createUser)


export const userRouter = router