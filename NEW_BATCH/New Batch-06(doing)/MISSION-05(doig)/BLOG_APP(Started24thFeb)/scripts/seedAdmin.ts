import { prisma } from "../lib/prisma"

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin Saheb",
            email:"admin@gmail.com",
            // role:UserRole

        }
        //check user exists in db or not
        const existingUser = await prisma.user.findUniqueOrThrow(
{where:{email:"john.dfode@example.com"}}
        )
console.log("Existing User",existingUser)
console.log("Existing User",existingUser)
    } catch (error) {
        console.log(error)
        console.log(error)
    }
}