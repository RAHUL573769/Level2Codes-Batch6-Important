import { Post } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"


const createPostIntoDb = async (data: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.post.create({ data })
    return result

}
const getPostFromDb = async () => {
    const result = await prisma.post.findMany()
    return result
    console.log("Get All Posts")

}




export const postService = { createPostIntoDb, getPostFromDb }