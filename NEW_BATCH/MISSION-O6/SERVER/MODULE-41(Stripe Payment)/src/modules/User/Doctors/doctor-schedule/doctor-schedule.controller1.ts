import { Request, Response } from "express";
import { catchAsync1 } from "../../../../helpers/catchAsunc.js";
import { sendResponse } from "../../../../helpers/succesRespose.js";
import status from "http-status";
import { DoctorScheduleService } from "./doctor-schedule.service.js";
import { IQueryParams } from "../../../../interfaces/queryInterface.js";


const createMyDoctorSchedule = catchAsync1(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const doctorSchedule = await DoctorScheduleService.createMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Doctor schedule created successfully',
        data: doctorSchedule
    });
});

const getMyDoctorSchedules = catchAsync1(async (req: Request, res: Response) => {
    const user = req.user;
    const query = req.query;
    const result = await DoctorScheduleService.getMyDoctorSchedules(user, query as IQueryParams);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Doctor schedules retrieved successfully',
        // data: result.data,
        // meta: result.meta
    });
});

const getAllDoctorSchedules = catchAsync1(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await DoctorScheduleService.getAllDoctorSchedules(query as IQueryParams);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'All doctor schedules retrieved successfully',

    });
});

const getDoctorScheduleById = catchAsync1(async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const doctorSchedule = await DoctorScheduleService.getDoctorScheduleById(doctorId as string, scheduleId as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Doctor schedule retrieved successfully',
        data: doctorSchedule
    });
});

const updateMyDoctorSchedule = catchAsync1(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const updatedDoctorSchedule = await DoctorScheduleService.updateMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Doctor schedule updated successfully',
        data: updatedDoctorSchedule
    });
});

const deleteMyDoctorSchedule = catchAsync1(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    await DoctorScheduleService.deleteMyDoctorSchedule(id as string, user);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Doctor schedule deleted successfully',
    });
});


export const DoctorScheduleController = {
    createMyDoctorSchedule,
    getMyDoctorSchedules,
    getAllDoctorSchedules,
    getDoctorScheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule
}