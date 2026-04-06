import { prisma } from "../lib/prisma";

async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: "rahul@gmail.com",
        },
        update: {
            name: "aulk",
        },
        create: {
            name: "aulk",
            email: "rahul@gmail.com",
        },
    });

    console.log("Final-User", user);

    const getUser = await prisma.user.findMany();
    console.log("All-Users", getUser);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
