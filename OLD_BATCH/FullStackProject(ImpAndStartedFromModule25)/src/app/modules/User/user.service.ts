// import { PrismaClient } from "@prisma/client";

import * as bcrypt from 'bcrypt'
import { UserRole } from '../../../../generated/prisma/enums';
import { PrismaClient } from '../../../../generated/prisma/client';
import { prisma } from '../../../../lib/prisma';
// import { Prisma } from "@prisma/client"




const createAdmin = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient: any) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: data.admin
        });

        return createdAdminData;
    });

    return result;
};

export const UserService = {
    createAdmin,
};
