import z from "zod";
import { Gender } from "../../../../generated/enums";

// export const createDoctorZodValidation = z.object({
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




export const createDoctorZodValidation = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
    doctor: z.object({
        name: z.string("Name is required and must be string").min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters"),

        email: z.email("Invalid email address"),

        contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 15 characters"),

        address: z.string("Address is required").min(10, "Address must be at least 10 characters").max(100, "Address must be at most 100 characters").optional(),

        registrationNumber: z.string("Registration number is required"),

        experience: z.int("Experience must be an integer").nonnegative("Experience cannot be negative").optional(),

        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be either MALE or FEMALE"),

        appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative"),

        qualification: z.string("Qualification is required").min(2, "Qualification must be at least 2 characters").max(50, "Qualification must be at most 50 characters"),

        currentWorkingPlace: z.string("Current working place is required").min(2, "Current working place must be at least 2 characters").max(50, "Current working place must be at most 50 characters"),

        designation: z.string("Designation is required").min(2, "Designation must be at least 2 characters").max(50, "Designation must be at most 50 characters"),

    }),
    specialties: z.array(z.uuid(), "Specialties must be an array of strings").min(1, "At least one specialty is required")
})

export const updateDoctorZodValidation = z.object({}).partial()