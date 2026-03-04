import { prisma } from "./lib/prisma";

const server = async () => {
    // const post = await prisma.user.create({
    //     data: {
    //         email: "rahul2@gmail.com",
    //         name: "Rahul",
    //     },
    // });

    // console.log(post);

    const user = await prisma.user.delete({
        where: {
            id: 1
        }
    })
    console.log("Deleted User", user)
    // if (!user) {
    //     console.log("User not found");
    //     return;
    // }

    const updatedUser = await prisma.user.update({
        where: { email: "rahul2@gmail.com" },
        data: { name: "Rahul Updated" },
    });


};

server();
