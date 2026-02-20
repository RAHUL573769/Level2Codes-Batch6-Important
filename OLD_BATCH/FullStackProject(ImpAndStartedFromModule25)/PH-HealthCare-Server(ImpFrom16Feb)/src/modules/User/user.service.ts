
import bcrypt from "bcryptjs";
import { UserRole } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"

const createAdminService = async (data: any) => {
    // console.log(data)
    const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync("B4c0/\/", salt);
    // const hashedPassword: string = await bcrypt.hash(req.body.password, 12)
    const hashedPassword: string = await bcrypt.hashSync(data.password, salt)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    console.log("User Data", userData)
    const result = await prisma.$transaction(async (x) => {
        const createdUser = await x.user.create({
            data: userData
        })
        const createdAdmin = await x.admin.create({
            data: data.admin
        })
        return createdAdmin

    })

    return result
}

export const userService = { createAdminService }