import { UserRole } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma";

const main = async () => {
    try {
        // const createUser = await prisma.user.create({
        //     data: {
        //         username: "user201",
        //         email: "user210@ph.com",
        //         role: UserRole.user
        //     }
        // });
        // console.log(createUser)

        const createProfile = await prisma.profile.create({
            data: {
                bio: "this is bio...",
                userId: 1
            }
        })

        const createCategory = await prisma.category.create({
            data: {
                name: "software engineering"
            }
        })
        // const createdPost = await prisma.post.create({
        //     data: {
        //         title: "this is title 5",
        //         content: "this is content of the post. 5",
        //         authorId: 3, // user with id=3 must exist
        //         postCategory: {
        //             create: [
        //                 { categoryId: 1 },
        //                 { categoryId: 3 },
        //                 { categoryId: 4 }
        //             ]
        //         }
        //     },
        //     include: {
        //         postCategory: true
        //     }
        // });

        // console.log(createdPost);
    } catch (error) {
        console.error("Error creating post:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();
