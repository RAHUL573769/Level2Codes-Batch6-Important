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



import { prisma } from "../../../lib/prisma"


const getAdminDataFromDb = async (
    payload: any
    // payload: any
) => {
    console.log('Payload', payload)
    const { search, ...filteredData } = payload
    const andConditions = []
    console.log('FD', filteredData)
    const adminSearchAbleFields = ["name", "email"]

    // 🔍 Search by name OR email
    if (search) {
        andConditions.push({
            OR: adminSearchAbleFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        })
    }
    if (Object.keys(filteredData).length > 0) {
        andConditions.push({

            AND: Object.keys(filteredData).map(key => ({
                [key]: {
                    equals: filteredData[key]
                }
            }))
        })
    }

    // 🏷️ Filter by tags
    // if (tags && tags.length > 0) {
    //     andConditions.push({
    //         tags: {
    //             hasSome: tags,
    //         },
    //     })
    // }

    // 🧠 Build final where condition
    const whereConditions =
        andConditions.length > 0
            ? { AND: andConditions }
            : {}

    const data = await prisma.admin.findMany({
        where: whereConditions,
    })

    return data
}

export const AdminServices = { getAdminDataFromDb }
