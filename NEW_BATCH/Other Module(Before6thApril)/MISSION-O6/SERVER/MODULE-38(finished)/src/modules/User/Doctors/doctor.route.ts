import express from 'express';
import { doctorController } from './doctor.controller';


const router = express.Router()

router.get("/get-doctor", doctorController.getDoctorController)


export const DoctorRoutes = router