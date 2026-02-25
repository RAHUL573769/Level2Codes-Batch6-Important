
import bcrypt from "bcryptjs";
import { UserRole } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploadersCopy";
// import { file } from '../../../generated/prisma/models';

const createAdminService = async (
    req: any
) => {
    console.log('22-->', req.file)

    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file)
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
        console.log("16 -->uploadToCloudinary", uploadToCloudinary)
        console.log(req.body)
    }

    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword: string = await bcrypt.hash(data.password, 12);

    // const userData = {
    //     email: data.admin.email,
    //     password: hashedPassword,
    //     role: UserRole.ADMIN
    // };
    // console.log("User Data", userData)
    // const result = await prisma.$transaction(async (x) => {
    //     const createdUser = await x.user.create({
    //         data: userData
    //     });
    //     const createdAdmin = await x.admin.create({
    //         data: data.admin
    //     });
    //     return createdAdmin;
    // });
    // return result;

    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword: string = await bcrypt.hash(data.password, 12);

    // const userData = {
    //     email: data.admin.email,
    //     password: hashedPassword,
    //     role: UserRole.ADMIN
    // };
    // console.log("User Data", userData)
    // const result = await prisma.$transaction(async (x) => {
    //     const createdUser = await x.user.create({
    //         data: userData
    //     });
    //     const createdAdmin = await x.admin.create({
    //         data: data.admin
    //     });
    //     return createdAdmin;
    // });
    // return result;
}
const createDoctorService = async (
    data: any
) => {

    // const { a }
    console.log('34', data)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    const userData = {
        email: data.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    };
    console.log("User Data", userData)
    const { password, doctor, appointmentFee, qualification, currentWorkingPlace, designation } = data;
    console.log(appointmentFee)
    const result = await prisma.$transaction(async (x) => {
        const createdUser = await x.user.create({
            data: userData
        });
        console.log(createdUser)
        const createdDoctor = await x.doctor.create({
            // data: data.doctor
            data: {
                ...doctor,
                password,
                appointmentFee,
                qualification,
                currentWorkingPlace,
                designation
            }

        });
        console.log('51', createdDoctor)
        return createdDoctor;
    });
    return result;
}
export const userService = { createAdminService, createDoctorService }