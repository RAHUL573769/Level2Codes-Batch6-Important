import express, { Request, Response } from 'express';
import { createAdminController } from './user.cotroller';
const router = express.Router()
router.post("/", createAdminController.createAdmin)


export const UserRoute = router