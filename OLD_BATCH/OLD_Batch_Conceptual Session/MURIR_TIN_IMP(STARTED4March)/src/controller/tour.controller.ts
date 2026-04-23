




import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helpers/sucessResponse";
import status from "http-status";
import { TourService } from "../services/tour.services";

//     res.status(jsonData.statusCode).json({
//         message: jsonData.message,
//         data: jsonData.data
//     })
// }

const createTour = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const TourData = req.body;

        const result = await TourService.createTourServices(TourData)
        // const result = await Tour.create(TourData)
        // res.status(200).json({
        //     message: "Tour Ceated",
        //     data: result
        // })
        successResponse(res, req, {
            statusCode: status.OK,
            message: "Tour Data Created",
            success: true,
            data: result
        })

    } catch (error: any) {
        // res.status(500).json({
        //     status: "fail",
        //     messsage: error.message || "Error Found"
        // })
        next(error)
    }
}


const getTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await TourService.getTourServices()
        successResponse(res, req, {
            statusCode: 200,
            message: "All Tour Fetched",
            success: true,
            data: data
        })
        // res.status(200).json({
        //     message: "Tour Fetched",
        //     data: data
        // })
    } catch (error) {
        next(error)
    }

}



const getSingleTour = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id;
        const data = await TourService.getSingleTourServices(id as string)
        successResponse(res, req, {
            statusCode: 200,
            message: "All Tour Fetched",
            success: true,
            data: data
        })
        // res.status(200).json({
        //     message: "Tour Fetched",
        //     data: data
        // })
    } catch (error) {
        next(error)
    }

}


export const TourController = { createTour, getTour, getSingleTour }