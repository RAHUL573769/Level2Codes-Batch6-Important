
import * as bcrypt from 'bcrypt'
import { UserRole } from '../../../../generated/prisma/enums';
import { prisma } from '../../../../lib/prisma';

// const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient: { user: { create: (arg0: { data: { email: any; password: string; role: "ADMIN"; }; }) => any; }; admin: { create: (arg0: { data: any; }) => any; }; }) => {
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


export const userService = {
    createAdmin
}