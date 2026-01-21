import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";



const createAdmin = async (data: any) => {
    const userData = {
        email: data.admin.email,
        password: data.password,
        role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({ data: userData });

    });

    console.log("Admin Created");
    return result;
};

export const UserService = { createAdmin };
