// model Doctor {
//     id String @id @default (uuid(7))

import { Specialty } from "../../../generated/browser"
import { Gender, ROLE } from "../../../generated/enums"
import auth from "../../lib/auth"
import { prisma } from "../../lib/prisma"

//     name          String
//     email         String @unique
//     profilePhoto  String ?
//         contactNumber String ?
//             address       String ?
//                 isDeleted     Boolean @default (false)
//     deletedAt     DateTime ?

//         registrationNumber  String @unique
//     experience          Int @default (0)
//     gender              Gender
//     appointmentFee      Float
//     qualification       String
//     currentWorkingPlace String
//     designation         String
//     averageRating       Float @default (0.0)

//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt

//     //relations

//     userId String @unique
//     user   User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)

//     specialties DoctorSpecialty[]

//     @@index([email])
//     @@index([isDeleted], name: "idx_doctor_isDeleted")
//     @@map("doctors")
// }







// interface ICreateDoctorPayload1 {
//     password: string
//     doctor: {
//         name: string,
//         email: string,

//         profilePhoto?: string,
//         contactNumber?: string,
//         address?: string,
//         registrationNumber: string,
//         experience?: string,
//         specialization: string,
//         gender: Gender,
//         appointmentFee: number,
//         currentWorkingPlace: string,
//         designation: string


//     }
//     specialties: string[]
// }

export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber: string;
        experience?: number;
        gender: Gender;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
    }
    specialties: string[];
}
const createDoctor = async (payload: ICreateDoctorPayload) => {

    const specialties: Specialty[] = [];

    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })
        if (!specialty) {
            throw new Error(`Specialty with id ${specialtyId} not found`);
            // throw new AppError(status.NOT_FOUND, `Specialty with id ${specialtyId} not found`);
        }
        specialties.push(specialty);
    }


    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email
        }
    })

    if (userExists) {
        throw new Error("User with this email already exists");
        // throw new AppError(status.CONFLICT, "User with this email already exists");
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: ROLE.DOCTOR,
            name: payload.doctor.name,
            needsPasswordChange: true,
        }
    })


    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,
                }
            })

            const doctorSpecialtyData = specialties.map((specialty) => {
                return {
                    doctorId: doctorData.id,
                    specialtyId: specialty.id,
                }
            })

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor;

        })

        return result;
    } catch (error) {
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error;
    }
}
export const userService = { createDoctor }




// ----

/* eslint-disable @typescript-eslint/no-explicit-any */
// import status from "http-status";
// import { Role, Specialty } from "../../../generated/prisma/client";
// import AppError from "../../errorHelpers/AppError";
// import { auth } from "../../lib/auth";
// import { prisma } from "../../lib/prisma";
// import { ICreateAdminPayload, ICreateDoctorPayload } from "./user.interface";

// const createDoctor = async (payload: ICreateDoctorPayload) => {

//     const specialties: Specialty[] = [];

//     for (const specialtyId of payload.specialties) {
//         const specialty = await prisma.specialty.findUnique({
//             where: {
//                 id: specialtyId
//             }
//         })
//         if (!specialty) {
//             // throw new Error(`Specialty with id ${specialtyId} not found`);
//             throw new AppError(status.NOT_FOUND, `Specialty with id ${specialtyId} not found`);
//         }
//         specialties.push(specialty);
//     }


//     const userExists = await prisma.user.findUnique({
//         where: {
//             email: payload.doctor.email
//         }
//     })

//     if (userExists) {
//         // throw new Error("User with this email already exists");
//         throw new AppError(status.CONFLICT, "User with this email already exists");
//     }

//     const userData = await auth.api.signUpEmail({
//         body: {
//             email: payload.doctor.email,
//             password: payload.password,
//             role: Role.DOCTOR,
//             name: payload.doctor.name,
//             needPasswordChange: true,
//         }
//     })


//     try {
//         const result = await prisma.$transaction(async (tx) => {
//             const doctorData = await tx.doctor.create({
//                 data: {
//                     userId: userData.user.id,
//                     ...payload.doctor,
//                 }
//             })

//             const doctorSpecialtyData = specialties.map((specialty) => {
//                 return {
//                     doctorId: doctorData.id,
//                     specialtyId: specialty.id,
//                 }
//             })

//             await tx.doctorSpecialty.createMany({
//                 data: doctorSpecialtyData
//             })

//             const doctor = await tx.doctor.findUnique({
//                 where: {
//                     id: doctorData.id
//                 },
//                 select: {
//                     id: true,
//                     userId: true,
//                     name: true,
//                     email: true,
//                     profilePhoto: true,
//                     contactNumber: true,
//                     address: true,
//                     registrationNumber: true,
//                     experience: true,
//                     gender: true,
//                     appointmentFee: true,
//                     qualification: true,
//                     currentWorkingPlace: true,
//                     designation: true,
//                     createdAt: true,
//                     updatedAt: true,
//                     user: {
//                         select: {
//                             id: true,
//                             email: true,
//                             name: true,
//                             role: true,
//                             status: true,
//                             emailVerified: true,
//                             image: true,
//                             isDeleted: true,
//                             deletedAt: true,
//                             createdAt: true,
//                             updatedAt: true,
//                         }
//                     },
//                     specialties: {
//                         select: {
//                             specialty: {
//                                 select: {
//                                     title: true,
//                                     id: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })

//             return doctor;

//         })

//         return result;
//     } catch (error) {
//         console.log("Transaction error : ", error);
//         await prisma.user.delete({
//             where: {
//                 id: userData.user.id
//             }
//         })
//         throw error;
//     }
// }

// const createAdmin = async (payload: ICreateAdminPayload) => {
//     //TODO: Validate who is creating the admin user. Only super admin can create admin user and only super admin can create super admin user but admin user cannot create super admin user

//     const userExists = await prisma.user.findUnique({
//         where: {
//             email: payload.admin.email
//         }
//     })

//     if (userExists) {
//         throw new AppError(status.CONFLICT, "User with this email already exists");
//     }

//     const { admin, role, password } = payload;



//     const userData = await auth.api.signUpEmail({
//         body: {
//             ...admin,
//             password,
//             role,
//             needPasswordChange: true,
//         }
//     })

//     try {
//         const adminData = await prisma.admin.create({
//             data: {
//                 userId: userData.user.id,
//                 ...admin,
//             }
//         })

//         return adminData;


//     } catch (error: any) {
//         console.log("Error creating admin: ", error);
//         await prisma.user.delete({
//             where: {
//                 id: userData.user.id
//             }
//         })
//         throw error;
//     }


// }

// export const UserService = {
//     createDoctor,
//     createAdmin,
// }