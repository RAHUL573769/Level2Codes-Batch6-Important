import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createAdmine = z.object({
    password: z.string({
        message: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            message: "Name is required!"
        }),
        email: z.string({
            message: "Email is required!"
        }),
        contactNumber: z.string({
            message: "Contact Number is required!"
        })
    })
});


export const createDoctor = z.object({
    password: z.string({
        message: "Password is required"
    }),
    doctor: z.object({
        name: z.string({
            message: "Name is required!"
        }),
        email: z.string({
            message: "Email is required!"
        }),

        contactNumber: z.string({
            message: "Contact Number is required!"
        }),
        address: z.string({ message: "Address is  Needed" }).optional(),
        registrationNumber: z.string(),
        experience: z.number(),
        gender: z.enum([Gender.FEMALE, Gender.MALE]),
        appointmentFee: z.number(),
        qualification: z.string(),
        currentWorkingPlace: z.string(),
        designation: z.string(),
    }),


})