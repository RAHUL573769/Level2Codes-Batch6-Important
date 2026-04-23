
import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { successResponse } from "../helpers/sucessResponse";
import status from "http-status";

const createReview = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const ReviewData = req.body;

        const result = await ReviewService.createReviewServices(ReviewData)
        // const result = await Review.create(ReviewData)
        // res.status(200).json({
        //     message: "Review Ceated",
        //     data: result
        // })
        successResponse(res, req, {
            statusCode: status.OK,
            message: "Review Data Created",
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


const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ReviewService.getReviewServices()
        successResponse(res, req, {
            statusCode: 200,
            message: "All Review Fetched",
            success: true,
            data: data
        })
        // res.status(200).json({
        //     message: "Review Fetched",
        //     data: data
        // })
    } catch (error) {
        next(error)
    }

}



const getSingleReview = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id;
        const data = await ReviewService.getSingleReviewServices(id as string)
        successResponse(res, req, {
            statusCode: 200,
            message: "All Review Fetched",
            success: true,
            data: data
        })
        // res.status(200).json({
        //     message: "Review Fetched",
        //     data: data
        // })
    } catch (error) {
        next(error)
    }

}


export const ReviewController = { createReview, getReview, getSingleReview }