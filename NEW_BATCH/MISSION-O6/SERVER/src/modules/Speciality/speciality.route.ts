import express from 'express';
import { SpecialityController } from './speciality.controller';


const router = express.Router()

router.post("/create-specialties", SpecialityController.createSpecility)


export const SpecialityRoute = router