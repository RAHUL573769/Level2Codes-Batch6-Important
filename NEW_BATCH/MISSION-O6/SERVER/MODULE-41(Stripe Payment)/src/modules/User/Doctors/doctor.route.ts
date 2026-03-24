import express from 'express';
import { doctorController } from './doctor.controller.js';



const router = express.Router()

router.get("/get-doctor", doctorController.getDoctorController)
router.get("/",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.getDoctorController);
router.get("/:id",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.getDoctorById);
router.patch("/:id",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    // validateRequest(updateDoctorZodSchema),
    doctorController.updateDoctor);
router.delete("/:id",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.deleteDoctor);

export const DoctorRoutes = router