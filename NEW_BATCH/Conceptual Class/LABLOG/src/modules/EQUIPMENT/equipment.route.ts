import express from 'express';
import { equipmentController } from './equipment.controller';


const router = express.Router()


router.post("/", equipmentController.createEquipment)
router.get("/", equipmentController.getEquipment)
export const eqipmnentRouter = router