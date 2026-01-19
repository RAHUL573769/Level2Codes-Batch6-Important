import { prisma } from "./lib/prisma";

const server = async () => {
    // const post = await prisma.user.create({
    //     data: {
    //         email: "rahul2@gmail.com",
    //         name: "Rahul",
    //     },
    // });

    // console.log(post);

    const user = await prisma.user.findUnique({
        where: { email: "rahul2@gmail.com" },
    });

    if (!user) {
        console.log("User not found");
        return;
    }

    const updatedUser = await prisma.user.update({
        where: { email: "rahul2@gmail.com" },
        data: { name: "Rahul Updated" },
    });


};

server();
