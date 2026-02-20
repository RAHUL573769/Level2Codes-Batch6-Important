import express from 'express';
import { LoginController } from './auth.controller';
const router = express.Router()


router.post("/login", LoginController.loginController)

export const AuthRouter = router