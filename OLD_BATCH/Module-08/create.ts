import { UserRole } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma";

const main = async () => {
    try {
        const createUser = await prisma.user.create({
            data: {
                username: "udydsd6esssser2dsf1d601",
                email: "userdyd26de1sssfdds016@ph6.com",
                role: UserRole.user
            }
        });

        // const user = await prisma.user.create({
        //     data: {
        //         username: "John Doe",
        //     },
        // })

        const post = await prisma.post.create({
            data: {
                title: "My First Post",
                content: "This is my post content",
                authorId: createUser.id,
            },
        })

        // console.log(createUser)

        const createProfile = await prisma.profile.create({
            data: {
                bio: "this is b16io...",
                userId: createUser.id
            }
        })
        // console.log("Create Profile", createProfile)

        const createCategory = await prisma.category.create({
            data: {
                name: "software engineering1"
            }
        })
        // console.log("Create Category", createCategory)
        const createdPost = await prisma.post.create({
            data: {
                title: "this is title 5",
                content: "this is content of the post. 5",
                authorId: createUser.id, // user with id=3 must exist
                postCategory: {
                    create: [
                        { categoryId: 1 },
                        { categoryId: 3 },
                        { categoryId: 4 }
                    ]
                }
            },
            include: {
                postCategory: true
            }
        });

        // console.log(createdPost);


        //relation filters
        const publishedPosts = await prisma.user.findMany({
            include: {
                post: { where: { published: false } }
            }
        })

        console.dir(publishedPosts, {
            depth: Infinity

        })


        const andFiltering = await prisma.post.findMany({
            where: {

            }
        })

    } catch (error) {
        console.error("Error creating post:", error);
    }
};

main();
