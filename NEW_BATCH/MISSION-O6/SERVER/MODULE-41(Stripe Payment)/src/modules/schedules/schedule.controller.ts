import { Request, Response } from "express";
import { catchAsync1 } from "../../helpers/catchAsunc.js";
import { ScheduleService } from "./schedule.service.js";
import { sendResponse } from "../../helpers/succesRespose.js";
import status from "http-status";
import { IQueryParams } from "../../interfaces/queryInterface.js";

const createSchedule = catchAsync1(async (req: Request, res: Response) => {
    const payload = req.body;
    const schedule = await ScheduleService.createSchedule(payload);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Schedule created successfully',
        data: schedule
    });
});

const getAllSchedules = catchAsync1(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await ScheduleService.getAllSchedules(query as IQueryParams);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Schedules retrieved successfully',

    });
});

const getScheduleById = catchAsync1(async (req: Request, res: Response) => {
    const { id } = req.params;
    const schedule = await ScheduleService.getScheduleById(id as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Schedule retrieved successfully',
        data: schedule
    });
});

const updateSchedule = catchAsync1(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const updatedSchedule = await ScheduleService.updateSchedule(id as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Schedule updated successfully',
        data: updatedSchedule
    });
});

const deleteSchedule = catchAsync1(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ScheduleService.deleteSchedule(id as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Schedule deleted successfully',
    });
}
);

export const ScheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
}