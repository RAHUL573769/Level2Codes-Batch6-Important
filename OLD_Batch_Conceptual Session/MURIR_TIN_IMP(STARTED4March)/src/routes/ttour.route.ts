import express from 'express';
import { TourController } from '../controller/tour.controller';
const router = express.Router()
router.get("/get-tour", TourController.getTour)
router.get("/get-tour/:id", TourController.getSingleTour)
router.post("/create-tour", TourController.createTour
)
export const TourRoute = router