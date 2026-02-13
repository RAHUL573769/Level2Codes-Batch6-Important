import express from 'express';
import loginUserControllerCode from './auth.controller';
// import { loginUserController } from './auth.controller';



const router = express.Router()
router.post("/login", loginUserControllerCode)
export const loginRouter = router