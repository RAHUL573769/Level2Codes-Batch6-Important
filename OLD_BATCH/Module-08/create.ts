import { UserRole } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma";

const main = async () => {
    try {
        const createUser = await prisma.user.create({
            data: {
                username: "uedsxsydrdswsd6edsssser2dsf1d601",
                email: "userdyxesdrsdsw26ded1sssfdds016@ph6.com",
                role: UserRole.user
            }
        });
        const updateUser = await prisma.user.update({
            where: { id: 109 },
            data: { age: 30 }
        })
        console.log("UpdateUser", updateUser)

        const averageAggregate = await prisma.user.aggregate({
            _avg: {
                age: true
            }
        })
        console.log("Average", averageAggregate)
        const sumAge = await prisma.user.aggregate({
            _sum: { age: true }
        })
        console.log("SumAge", sumAge)
        // const user = await prisma.user.create({
        //     data: {
        //         username: "John Doe",
        //     },
        // })

        const countAge = await prisma.user.aggregate({
            _count: {
                age: true
            }
        })
        console.log("CountAge", countAge)


        const post = await prisma.post.create({
            data: {
                title: "My First Post",
                content: "This is my post content",
                authorId: createUser.id,
            },
        })

        const groupPost = await prisma.post.groupBy({
            by: ['published'],
            where: {
                published: true,
            },
            _count: {
                title: true,
            },
        });





        console.log("GroupPost", groupPost)
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


const batchTransaction = async () => {
    const [userData, updateData] = await prisma.$transaction([
        prisma.user.create({
            data: {
                username: "uedsxsyddswswd6edsssser2dsf1d601",
                email: "userdyxesdsdsw2w6ded1sssfdds016@ph6.com",
                role: UserRole.user,
            },
        }),
        prisma.user.update({
            where: { id: 1 },
            data: { age: 305 },
        }),
    ]);
    console.log(updateData)
    return { userData, updateData };
};

const interctiveTransaction = async () => { 

    
}




batchTransaction()

// main();
