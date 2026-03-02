import { Post } from "../../generated/prisma/client"
import { PostWhereInput } from "../../generated/prisma/models"
import { prisma } from "../../lib/prisma"


const createPostIntoDb = async (data: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.post.create({ data })
    return result

}
const getPostFromDb = async () => {
    const result = await prisma.post.findMany()
    console.log("result", result)
    return result

}
// const getSpecificPostFromDb = async (payload: { search: string | undefined, tags: string[] }) => {
//     const result = await prisma.post.findMany({
//         where: {
//             // title: {
//             //     contains: payload.search as string,
//             //     mode: "insensitive"
//             // }
//             // OR: [
//             //     {
//             //         title: {
//             //             contains: payload.search as string,
//             //             mode: "insensitive"
//             //         }
//             //     }, {
//             //         content: {
//             //             contains: payload.search as string,
//             //             mode: "insensitive"
//             //         },
//             //         {
//             //         tags: {
//             //             has: payload.search as string
//             //         }
//             //     }
//             //     }


//             // ]
//             OR: [
//                 {
//                     title: {
//                         contains: payload.search as string,
//                         mode: "insensitive"
//                     }
//                 },
//                 {
//                     content: {
//                         contains: payload.search as string,
//                         mode: "insensitive"
//                     }
//                 },
//                 {
//                     tags: {
//                         has: payload.search as string
//                     }
//                 }
//             ],
//             tags: [
//                 hasEvery: payload.tags as string[]
//             ]
//         }
//     })
//     console.log("result", result)
//     return result

// }
const getSpecificPostFromDb = async (payload: { search: string | undefined; tags: string[], isFeatured: boolean }) => {

    const andConditions: PostWhereInput[] = []
    if (payload.search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: payload.search as string,
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: payload.search as string,
                        mode: "insensitive",
                    },
                },
                {
                    tags: {
                        has: payload.search as string,
                    },
                },
            ],
        },)

    }
    if (payload.tags.length > 0) {
        andConditions.push({
            tags: {
                hasEvery: payload.tags,
            },
        })
    }
    if (typeof payload.isFeatured === "boolean") {
        andConditions.push({
            isFeatured: payload.isFeatured,

        })
    }
    console.log(typeof (payload.isFeatured))
    const result = await prisma.post.findMany({
        where: {

            AND:
                andConditions
            // {
            //     OR: [
            //         {
            //             title: {
            //                 contains: payload.search as string,
            //                 mode: "insensitive",
            //             },
            //         },
            //         {
            //             content: {
            //                 contains: payload.search as string,
            //                 mode: "insensitive",
            //             },
            //         },
            //         {
            //             tags: {
            //                 has: payload.search as string,
            //             },
            //         },
            //     ],
            // },

            // {
            //     tags: {
            //         hasEvery: payload.tags,
            //     },
            // }

            // OR: [
            //     {
            //         title: {
            //             contains: payload.search as string,
            //             mode: "insensitive",
            //         },
            //     },
            //     {
            //         content: {
            //             contains: payload.search as string,
            //             mode: "insensitive",
            //         },
            //     },
            //     {
            //         tags: {
            //             has: payload.search as string,
            //         },
            //     },
            // ],
            // tags: {
            //     hasEvery: payload.tags,
            // },
        },
    });

    // console.log("result", result);
    return result;
};




export const postService = { getSpecificPostFromDb, createPostIntoDb, getPostFromDb }