import { Request, RequestHandler, Response } from "express"
import { catchAsync1 } from "../../../helpers/catchAsunc"
import { sendResponse } from "../../../helpers/succesRespose"
import { DoctorService } from "./doctor.service"
import status from "http-status"

const getDoctorController: RequestHandler = catchAsync1(async (req, res) => {


    const result = await DoctorService.getAllDoctors()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Doctor Fetched"
    })




})


const getDoctorById = catchAsync1(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const doctor = await DoctorService.getDoctorById(id as string);

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: "Doctor fetched successfully",
            data: doctor,
        })
    }
)

const updateDoctor = catchAsync1(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;

        const updatedDoctor = await DoctorService.updateDoctor(id as string, payload);

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: "Doctor updated successfully",
            data: updatedDoctor,
        })
    }
)

const deleteDoctor = catchAsync1(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await DoctorService.deleteDoctor(id as string);

        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: "Doctor deleted successfully",
            data: result,
        })
    }
)


export const doctorController = { getDoctorController, getDoctorById, updateDoctor, deleteDoctor }