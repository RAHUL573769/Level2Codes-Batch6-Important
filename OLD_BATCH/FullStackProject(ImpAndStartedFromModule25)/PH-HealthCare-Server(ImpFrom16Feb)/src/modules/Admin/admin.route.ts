import express, { Request, Response } from 'express';
import { AdminController } from './admi.controller';


const router = express.Router()

router.get("/", AdminController.getAdminData)
export const AdminRouter = router