import { UserRole } from "../../generated/prisma/enums";
// import { UserWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
// import { UserWhereInput } from '../../generated/prisma/models/User';
import { Admin, Prisma } from "../../generated/prisma/client";
// import { SortOrder } from '../../generated/prisma/internal/prismaNamespace';



const paginationFunction = (options: { page?: number, limit?: number, sortBy?: string, sortOrder?: string }) => {

    const page: number = Number(options.page) || 1
    const limit: number = Number(options.limit) || 10
    const skip: number = (Number(page)) * limit
    const sortBy: string = options.sortBy || "createdAt"
    const sortOrder: string = options.sortOrder || "desc"
    return {
        page, limit, skip, sortBy, sortOrder
    }
}

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

// const getAdmin = async (params: any) => {
//     const andConditions: Prisma.UserWhereInput[] = [];

//     if (params.searchTerm) {

//         andConditions.push({
//             OR: ["name", "email"].map(field => ({
//                 [field]: {
//                     contains: params.searchTerm,
//                     mode: "insensitive"
//                 }
//             }))
//         })

//         const whereConditions: Prisma.UserWhereInput =
//             andConditions.length > 0 ? { AND: andConditions } : {};

//         const result = await prisma.user.findMany({
//             where: whereConditions,
//         });

//         return result;
//         // -----------------
//         const orConditions: Prisma.UserWhereInput[] = [
//             {
//                 email: {
//                     contains: params.searchTerm,
//                     mode: "insensitive",
//                 },
//             },
//         ];

//         if (!isNaN(Number(params.searchTerm))) {
//             orConditions.push({
//                 user_id: {
//                     equals: Number(params.searchTerm),
//                 },
//             });
//         }

//         andConditions.push({
//             OR: orConditions,
//         });
//     }


// };

// const getAdmin = async (params: any) => {
//     const { searchTerm, ...filteredData } = params
//     console.log('75', filteredData)
//     const andConditions: Prisma.UserWhereInput[] = [];
//     const adminSearchAbleFields = ["email"]
//     if (params.searchTerm) {
//         andConditions.push({
//             OR: adminSearchAbleFields.map(field => ({
//                 [field]: {
//                     contains: params.searchTerm,
//                     mode: "insensitive",
//                 },
//             })),
//         });
//     }
//     if (Object.keys(filteredData).length > 0) {
//         andConditions.push({
//             AND: Object.keys(filteredData).map(key => {
//                 return {
//                     [key]: {
//                         equals: filteredData[key],
//                     },
//                 };
//             }),
//         });

//     }

//     const whereConditions: Prisma.UserWhereInput =
//         andConditions.length > 0 ? { AND: andConditions } : {};

//     const result = await prisma.user.findMany({
//         where: whereConditions,
//     });

//     return result;
// };

const getAdmin = async (params: any, options: any) => {
    const { searchTerm, ...filteredData } = params;

    // 🔴 CHANGED: use paginationFunction ONLY (remove duplicates)
    const { page, limit, skip, sortBy, sortOrder } = paginationFunction(options); // ✅ FIXED

    // ❌ REMOVED (duplicate logic)
    // const pageNumber = Number(options?.page) || 1;
    // const limitNumber = Number(options?.limit) || 10;

    const andConditions: Prisma.UserWhereInput[] = [];

    // 🔴 CHANGED: safer searchable fields
    const adminSearchableFields = ["email"] as const;

    // 🔍 Search
    if (searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }

    // 🔴 ADDED: whitelist filters
    const allowedFilters = ["role", "status"];

    if (Object.keys(filteredData).length > 0) {
        Object.entries(filteredData).forEach(([key, value]) => {
            if (allowedFilters.includes(key)) {
                andConditions.push({
                    [key]: { equals: value },
                } as Prisma.UserWhereInput);
            }
        });
    }

    const whereConditions: Prisma.UserWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.user.findMany({
        where: whereConditions,

        // 🔴 CHANGED: correct pagination usage
        skip,           // ✅ FIXED
        take: limit,    // ✅ FIXED

        // 🔴 CHANGED: use destructured values
        orderBy: {
            [sortBy]: sortOrder, // ✅ FIXED
        },
    });

    return result;
};



const getAdminById = async (id: string) => {

    const result = await prisma.user.findUnique({
        where: {
            user_id: Number(id)
        },
    });

    return result;
};
const updateAdmin = async (id: string, data: Partial<Admin>) => {

    const result = await prisma.admin.update({
        where: { admin_id: Number(id) }, data
    })

    return result
}
const deleteFromDb = async () => { }
export const UserService = { deleteFromDb, createAdmin, getAdmin, getAdminById, updateAdmin };
