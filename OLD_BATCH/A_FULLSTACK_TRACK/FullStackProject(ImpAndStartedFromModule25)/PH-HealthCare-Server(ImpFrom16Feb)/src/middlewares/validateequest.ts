import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";


export const validateRequest = (zodSchema: ZodObject) => {

    return (req: Request, res: Response, next: NextFunction) => {

        console.log('10 from validaterequest', req.body.data)
        if (req.body.data) {
            req.body = JSON.parse(req.body.data)
        }
        console.log('13 from validate request ', req.body)

        const parsedResult = zodSchema.safeParse(req.body)
        console.log('16 from validate request', parsedResult)
        if (!parsedResult.success) {
            next(parsedResult.error)
        }

        //sanitizing the data
        req.body = parsedResult.data;
        console.log('23 from validate request', req.body)
        next();
    }
}