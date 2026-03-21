import express from 'express';
import { AuthController } from './auth.controller.js';

const router = express.Router()

router.post("/register-patient", AuthController.registerPatient)
router.post("/login", AuthController.loginUser)
export const AuthRoute = router

