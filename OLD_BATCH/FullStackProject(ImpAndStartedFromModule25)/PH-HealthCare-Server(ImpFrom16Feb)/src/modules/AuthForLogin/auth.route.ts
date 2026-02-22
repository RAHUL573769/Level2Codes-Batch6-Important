import express from 'express';
import { LoginController } from './auth.controller';
const router = express.Router()


router.post("/login", LoginController.loginController)
router.post(
    '/refresh-token',
    LoginController.refreshToken
)

router.post(
    '/change-password',
    // auth(
    //     UserRole.SUPER_ADMIN,
    //     UserRole.ADMIN,
    //     UserRole.DOCTOR,
    //     UserRole.PATIENT
    // ),
    LoginController.changePassword
);

router.post(
    '/forgot-password',
    LoginController.forgotPassword
);

router.post(
    '/reset-password',
    LoginController.resetPassword
)
export const AuthRouter = router