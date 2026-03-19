import express, { NextFunction, Request, Response } from 'express';
import { userServiceController1 } from './user.controller';
import z from 'zod';
import { Gender } from '../../../generated/enums';
import { validateRequest } from '../../helpers/validateRequestZod';
import { createDoctorZodValidation } from './Doctors/doctor.validations.';

// const createDoctorZodValidation = z.object({
//     password: z.string(),
//     doctor: {
//         name: z.string().min(1, "Name is required"),
//         email: z.string().email("Invalid email"),

//         profilePhoto: z.string().url("Invalid URL").optional(),

//         contactNumber: z
//             .string()
//             .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
//             .optional(),

//         address: z.string().optional(),

//         registrationNumber: z.string().min(1, "Registration number is required"),

//         experience: z.number().int().nonnegative().optional(),

//         gender: Gender.MALE,

//         appointmentFee: z.number().positive("Appointment fee must be positive"),

//         qualification: z.string().min(1, "Qualification is required"),

//         currentWorkingPlace: z.string().min(1, "Working place is required"),

//         designation: z.string().min(1, "Designation is required"),

//     },
//     specialties: z
//         .array(z.string()) // ⚠️ relaxed (since your first ID is not valid UUID)
//         .min(1, "At least one specialty is required"),



// })


const router = express.Router()

// const validateRequest = (zodSchema: z.ZodObject) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const parsedResult = zodSchema.safeParse(req.body)
//         if (!parsedResult.success) {
//             next(parsedResult.success)
//         }
//         req.body = parsedResult.data
//         next()

//     }
// }


router.post("/create-doctor", validateRequest(createDoctorZodValidation), userServiceController1.createDoctorController)

// router.post("/create-doctor", userServiceController1.createDoctorController)

// router.post("/create-doctor", (req: Request, res: Response, next: NextFunction) => {

//     const parsedResult = createDoctorZodValidation.safeParse(req.body)
//     if (!parsedResult.success) {
//         next(parsedResult.data)
//     }
//     req.body = parsedResult.data
//     console.log(req.body, "After Zod Validation")
//     next()
// }, userServiceController1.createDoctorController)


export const UserRoute = router