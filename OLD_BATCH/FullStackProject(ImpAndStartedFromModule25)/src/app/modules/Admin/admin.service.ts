import { prisma } from "../../../../lib/prisma"



const getAdminFromDb = async (params: any) => {
    const result = await prisma.admin.findMany({
        where: {
            name: {
                contains: params.searchTerm,
                mode: "insensitive"
            },
            email: {
                contains: params.searchTerm,
                mode: "insensitive"
            }
        }
    })
    return result
}


export const AdminService = { getAdminFromDb }