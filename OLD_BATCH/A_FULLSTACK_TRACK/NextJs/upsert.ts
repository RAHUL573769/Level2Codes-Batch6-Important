import { prisma } from "./lib/prisma";

const server = async () => {
    try {
        const user = await prisma.user.upsert({
            where: { email: "rahul2@gmail.com" },
            update: {
                email: "rashul76@gmail.com",
            },
            create: {
                email: "rahul2@gmail.com",
                name: "Rahul",
            },
        });

        console.log(user);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
};

server();
