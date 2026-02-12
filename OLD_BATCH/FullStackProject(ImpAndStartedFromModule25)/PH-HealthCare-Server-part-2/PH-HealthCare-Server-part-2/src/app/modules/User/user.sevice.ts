import * as bcrypt from 'bcrypt'
// import { UserRole } from '@prisma/client'
import { prisma } from '../../../../Resources/lib/prisma';
import { UserRole } from '../../../../generated/prisma/enums';

// import prisma from '../../../shared/prisma';
// import prisma from '../../../shared/prisma'

const createAdmin = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    // const result = await prisma.$transaction(async (tx) => {
    //     const createdUser = await tx.user.create({
    //         data: userData
    //     });

    //     const createdAdminData = await tx.admin.create({
    //         data: {
    //             ...data.admin,
    //             userId: createdUser.id
    //         }
    //     });

    //     return createdAdminData;
    // });
    // const result = await prisma.admin.create({
    //     data: {
    //         ...data.admin,
    //         user: {
    //             create: {
    //                 email: data.admin.email,
    //                 password: hashedPassword,
    //                 role: UserRole.ADMIN
    //             }
    //         }
    //     }
    // });

    const result = await prisma.admin.create({
        data: {
            name: data.admin.name,
            contactNumber: data.admin.contactNumber,
            profilePhoto: data.admin.profilePhoto, // if exists

            user: {
                create: {
                    email: data.admin.email,   // ✅ put email here
                    password: hashedPassword,
                    role: UserRole.ADMIN
                }
            }
        }
    });

    return result;
};

export const userService = {
    createAdmin
}
