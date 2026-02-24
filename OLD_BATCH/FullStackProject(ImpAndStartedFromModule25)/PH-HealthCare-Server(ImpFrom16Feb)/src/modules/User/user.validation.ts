import z from "zod";

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