
import bcrypt from "bcryptjs";
import { UserRole } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"

import { fileUploader } from "../../helpers/fileUploadersCopy";
import { Doctor, User } from '../../../generated/prisma/browser';
import { userSearchAbleFields } from "./user.constants";


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



    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient: any) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;

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
    req: any
) => {
    console.log('88-->', req.body)

    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file)
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
        console.log("16 -->uploadToCloudinary", uploadToCloudinary)
        console.log('94', req.body)
    }



    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient: any) => {
        await transactionClient.User.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.Doctor.create({
            data: req.body.doctor
        });
        console.log('115', createdDoctorData)
        return createdDoctorData
    });

    return result;

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
// const createDoctorService = async (
//     data: any
// ) => {

//     // const { a }
//     console.log('34', data)
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword: string = await bcrypt.hash(data.password, 12);

//     const userData = {
//         email: data.doctor.email,
//         password: hashedPassword,
//         role: UserRole.DOCTOR
//     };
//     console.log("User Data", userData)
//     const { password, doctor, appointmentFee, qualification, currentWorkingPlace, designation } = data;
//     console.log(appointmentFee)
//     const result = await prisma.$transaction(async (x) => {
//         const createdUser = await x.user.create({
//             data: userData
//         });
//         console.log(createdUser)
//         const createdDoctor = await x.doctor.create({
//             // data: data.doctor
//             data: {
//                 ...doctor,
//                 password,
//                 appointmentFee,
//                 qualification,
//                 currentWorkingPlace,
//                 designation
//             }

//         });
//         console.log('51', createdDoctor)
//         return createdDoctor;
//     });
//     return result;
// }


const getAdminDataFromDb = async (
    payload: any
    // payload: any
) => {
    console.log('Payload', payload)
    const { search, ...filteredData } = payload
    const andConditions = []
    console.log('FD', filteredData)


    // 🔍 Search by name OR email
    if (search) {
        andConditions.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        })
    }
    if (Object.keys(filteredData).length > 0) {
        andConditions.push({

            AND: Object.keys(filteredData).map(key => ({
                [key]: {
                    equals: filteredData[key]
                }
            }))
        })
    }

    // 🏷️ Filter by tags
    // if (tags && tags.length > 0) {
    //     andConditions.push({
    //         tags: {
    //             hasSome: tags,
    //         },
    //     })
    // }

    // 🧠 Build final where condition
    const whereConditions =
        andConditions.length > 0
            ? { AND: andConditions }
            : {}

    const data = await prisma.admin.findMany({
        where: whereConditions,
    })

    return data
}
export const userService = { getAdminDataFromDb, createAdminService, createDoctorService }