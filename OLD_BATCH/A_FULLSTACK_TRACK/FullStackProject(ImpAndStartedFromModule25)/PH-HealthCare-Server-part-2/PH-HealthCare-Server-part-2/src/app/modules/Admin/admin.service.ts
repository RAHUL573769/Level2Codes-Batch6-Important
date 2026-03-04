import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../../Resources/lib/prisma";
import { IAdminFilterRequest } from "./admin.iterface";


const getAllFromDB = async (params: IAdminFilterRequest, options: any) => {
    console.log(params)
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // equals: filterData[key]
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    const whereConditions =
        andConditions.length > 0 ? { AND: andConditions } : {};

    // const result = await prisma.admin.findMany({
    //     where: whereConditions,
    //     skip,
    //     take: limit,

    //     orderBy: options.sortBy && options.sortOrder
    //         ? { [options.sortBy]: options.sortOrder }
    //         : { createdAt: 'desc' }
    // });
    const result = await prisma.admin.findMany()
    return result;
};

export const AdminService = {
    getAllFromDB
};
