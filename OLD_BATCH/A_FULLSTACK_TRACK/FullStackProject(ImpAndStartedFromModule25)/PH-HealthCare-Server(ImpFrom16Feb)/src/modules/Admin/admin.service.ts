// import { Prisma } from "@prisma/client/extension";
// import { prisma } from "../../../lib/prisma"

// const getAdminDataFromDb = async (
//     payload: { search?: string; tags?: string[] }
// ) => {

//     const andConditions = []
//     console.dir(andConditions, { dep })
//     // 🔍 Search by name OR email
//     if (payload.search) {
//         andConditions.push({
//             OR:
//                 ["name", "email"].map(field => ({
//                     [field]: {
//                         contains: payload.search,
//                         mode: "insensitive"
//                     }

//                 }))
//             // -------------------------
//             //     [
//             //     {
//             //         name: {
//             //             contains: payload.search,
//             //             mode: "insensitive",
//             //         },
//             //     },
//             //     {
//             //         email: {
//             //             contains: payload.search,
//             //             mode: "insensitive",
//             //         },
//             //     },
//             // ],
//             // ------------
//         })
//     }

//     // 🏷️ Filter by tags (if provided)
//     if (payload.tags && payload.tags.length > 0) {
//         andConditions.push({
//             tags: {
//                 hasSome: payload.tags, // match any of the tags
//             },
//         })
//     }
//     const whereConditions = { AND: andConditions }

//     const data = await prisma.admin.findMany({
//         where: whereConditions
//         // where: andConditions.length > 0
//         //     ? { AND: andConditions }
//         //     : {}, // if no filters → return all
//     })

//     return data
// }

// export const AdminServices = { getAdminDataFromDb }



import { Admin } from "../../../generated/prisma/browser"
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"
import { adminSearchAbleFields } from "./admin.constants"

export type IAdminFilterRequest = {
    name?: string | undefined;
    email?: string | undefined;
    contactNumber?: string | undefined;
    searchTerm?: string | undefined;
}
export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}
type IOptions = {
    page?: number,
    limit?: number,
    sortOrder?: string,
    sortBy?: string
}
type IOptionsResult = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}

const calculatePagination = (options: IOptions): IOptionsResult => {

    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

const getAllFromDB = async (params: IAdminFilterRequest, options: IPaginationOptions) => {
    const { page, limit, skip } = calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.AdminWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    andCondions.push({
        isDeleted: false
    })

    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }

    const result = await prisma.admin.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
            }
    });

    const total = await prisma.admin.count({
        where: whereConditons
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};


// const getAdminDataFromDb = async (
//     payload: any, optionsPagination: any
//     // payload: any
// ) => {
//     // console.log('Payload', payload)
//     const { limit, page } = optionsPagination
//     console.log('limit', limit)
//     const { search, ...filteredData } = payload
//     const andConditions = []

//     // console.log('FD', filteredData)


//     // 🔍 Search by name OR email
//     if (search) {
//         andConditions.push({
//             OR: adminSearchAbleFields.map((field) => ({
//                 [field]: {
//                     contains: search,
//                     mode: "insensitive",
//                 },
//             })),
//         })
//     }
//     if (Object.keys(filteredData).length > 0) {
//         andConditions.push({

//             AND: Object.keys(filteredData).map(key => ({
//                 [key]: {
//                     equals: filteredData[key]
//                 }
//             }))
//         })
//     }

//     // 🏷️ Filter by tags
//     // if (tags && tags.length > 0) {
//     //     andConditions.push({
//     //         tags: {
//     //             hasSome: tags,
//     //         },
//     //     })
//     // }

//     // 🧠 Build final where condition
//     const whereConditions =
//         andConditions.length > 0
//             ? { AND: andConditions }
//             : {}

//     // const andCondition2: any[] = []
//     // if (search) {
//     //     andCondition2.push({
//     //         OR: [

//     //             { name: { contains: search }, },
//     //             { email: { contains: search } }
//     //         ],

//     //     })

//     // }
//     // const whereConditions2 = { AND: andCondition2 }
//     // const data1 = await prisma.admin.findMany({
//     //     where: whereConditions2




//     //     OR: [

//     //         { name: { contains: search }, },
//     //         { email: { contains: search } }
//     //     ],



//     // })

//     const data = await prisma.admin.findMany({
//         where: whereConditions,
//         skip: (Number(page) - 1) * limit,
//         take: Number(limit)

//     })

//     return data
// }
const getAdminById = async (id: string) => {
    const result = await prisma.admin.findUnique({ where: { id } })
    return result
}
const updateAdminService = async (id: string, data: Partial<Admin>) => {
    const result = await prisma.admin.update({ where: { id }, data })
    return result
}

const deleteFromDb = async (id: string) => {
    const result = await prisma.$transaction(async (x) => {
        const adminDeletedData = await x.admin.delete({
            where: {
                id
            }
        })
    })
}

const softDeleteFromDb = async (id: string) => {
    await prisma.admin.findUniqueOrThrow({
        where: { id }
    })


    const result = await prisma.$transaction(async (x) => {
        const adminDeletedData = await x.admin.update({
            where: {
                id
            },
            data: { isDeleted: true }
        })
    })
}



export const AdminServices1 = { softDeleteFromDb, deleteFromDb, getAllFromDB, getAdminById, updateAdminService }
