import { NextFunction, Request, Response } from "express";
import z from "zod";

export const update = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional()
    })
});

export const validateRequest = (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {


    try {
        // await schema.parseAsync(req.body)
        await schema.parseAsync({
            body: req.body
        })
        return next()

    } catch (error) {
        next(error)
    }
}