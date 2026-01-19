import { prisma } from "./lib/prisma";

const server = async () => {
    // const post = await prisma.user.create({
    //     data: {
    //         email: "rahul2@gmail.com",
    //         name: "Rahul",
    //     },
    // });

    // console.log(post);

    // const getAllUsers = await prisma.user.findMany()
    // console.log(getAllUsers)
    // const findFirst = await prisma.user.findFirst({
    //     where: { id: 1 }
    // })
    // console.log("First First", findFirst)

    // const findFirstOrThrow = await prisma.user.findFirstOrThrow({
    //     where: { id: 1 }
    // })
    // console.log("First First or Throw", findFirstOrThrow)


    const createMany = await prisma.user.createMany({
        data: [
            {
                email: "rashul6@gmail.com"

            },
            {
                email: "rashul76@gmail.com"

            },
        ]
    })
    console.log("Crated Many", createMany)
};

server();
