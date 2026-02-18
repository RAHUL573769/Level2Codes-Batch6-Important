
import { UserRole } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"

const createAdminService = async (data: any) => {
    // console.log(data)
    const userData = {
        email: data.admin.email,
        password: data.password,
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