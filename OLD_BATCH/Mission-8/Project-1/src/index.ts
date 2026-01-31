import { prisma } from "../lib/prisma"


async function main() {
    // Create a new user with a post
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alicersssss@prisma1.io',
            posts: {
                create: {
                    title: 'Hello World1',
                    content: 'This is my1 first post!',
                    published: true,
                },
            },
        },

    })
    console.log('Created user:', user)

    // const userFind = await prisma.user.findUniqueOrThrow({
    //     where: {
    //         email: "alic6rsse@prisma.io"
    //     }
    // })
    // console.log("UserFind", userFind)
    // Fetch all users with their posts

    const update = await prisma.user.update({
        where: { id: 1 },
        data: { email: "sssssssss" }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })