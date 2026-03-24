import express from 'express';
import { AuthController } from './auth.controller.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { Role } from '../generated/prisma/enums.js';

const router = express.Router()

router.post("/register-patient", AuthController.registerPatient)
router.post("/login", AuthController.loginUser)
router.post("/me", checkAuth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN), AuthController.getMe)
export const AuthRoute = router

