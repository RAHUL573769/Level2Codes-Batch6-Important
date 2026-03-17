import express from 'express';
import { SpecialityController } from './speciality.controller';


const router = express.Router()

router.post("/create-specialties", SpecialityController.createSpecility)
router.get("/get-specialties", SpecialityController.getSpecility)
router.delete("/:id", SpecialityController.deleteSpecility)


export const SpecialityRoute = router