
import bcrypt from "bcryptjs";
import { UserRole } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"
import { Request } from "express";

const createAdminService = async (
    data: any
) => {
    // console.log('22', data)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    };
    // console.log("User Data", userData)
    const result = await prisma.$transaction(async (x) => {
        const createdUser = await x.user.create({
            data: userData
        });
        const createdAdmin = await x.admin.create({
            data: data.admin
        });
        return createdAdmin;
    });
    return result;
}

export const userService = { createAdminService }