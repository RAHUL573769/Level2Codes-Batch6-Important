import * as bcrypt from 'bcrypt'

import { UserRole } from '../../../../generated/prisma/enums';
import { prisma } from '../../../../Resources/lib/prisma';



const createAdmin = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    const result = await prisma.$transaction(async (tx) => {
        // 1️⃣ Create User
        await tx.user.create({
            data: {
                email: data.admin.email,
                password: hashedPassword,
                role: UserRole.ADMIN
            }
        });

        // 2️⃣ Create Admin (NO userId)
        const createdAdminData = await tx.admin.create({
            data: {
                name: data.admin.name,
                email: data.admin.email, // must match user email
                contactNumber: data.admin.contactNumber,
                profilePhoto: data.admin.profilePhoto
            }
        });

        return createdAdminData;
    });

    return result;
};


export const userService = {
    createAdmin
}
