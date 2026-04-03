import { Request, Response } from "express";
import { catchAsync1 } from "../../helpers/catchAsunc.js";
import { sendResponse } from "../../helpers/succesRespose.js";
import status from "http-status";
import { AppointmentService } from "./appointment.service.js";


const bookAppointment = catchAsync1(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await AppointmentService.bookAppointment(payload, user);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Appointment booked successfully',
        data: appointment
    });
});

const getMyAppointments = catchAsync1(async (req: Request, res: Response) => {
    const user = req.user;
    const appointments = await AppointmentService.getMyAppointments(user);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Appointments retrieved successfully',
        data: appointments
    });
});

const changeAppointmentStatus = catchAsync1(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const payload = req.body;
    const user = req.user;

    const updatedAppointment = await AppointmentService.changeAppointmentStatus(appointmentId as string, payload, user);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Appointment status updated successfully',
        data: updatedAppointment
    });
});

const getMySingleAppointment = catchAsync1(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;

    const appointment = await AppointmentService.getMySingleAppointment(appointmentId as string, user);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Appointment retrieved successfully',
        data: appointment
    });
});

// const getAllAppointments = catchAsync1(async (req: Request, res: Response) => {
//     const appointments = await AppointmentService.getAllAppointments();
//     sendResponse(res, {
//         success: true,
//       statusCode: status.OK,
//         message: 'All appointments retrieved successfully',
//         data: appointments
//     });
// });

const bookAppointmentWithPayLater = catchAsync1(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await AppointmentService.bookAppointmentWithPayLater(payload, user);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Appointment booked successfully with Pay Later option',
        data: appointment
    });
});

const initiatePayment = catchAsync1(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const paymentInfo = await AppointmentService.initiatePayment(appointmentId as string, user);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Payment initiated successfully',
        data: paymentInfo
    });
});

export const AppointmentController = {
    bookAppointment,
    getMyAppointments,
    changeAppointmentStatus,
    getMySingleAppointment,
    // getAllAppointments,
    bookAppointmentWithPayLater,
    initiatePayment,
}