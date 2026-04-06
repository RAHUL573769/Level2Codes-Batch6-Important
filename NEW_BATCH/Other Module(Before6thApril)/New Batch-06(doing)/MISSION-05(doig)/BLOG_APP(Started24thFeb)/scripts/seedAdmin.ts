import { prisma } from "../lib/prisma"
import { UserRole } from "../middlware/auth"

async function seedAdmin() {
    try {
        const adminData = {
            name: "Alicfgec Johcnscon10",
            email: "aligfce.johcdncscon@example.com",
            role: UserRole.ADMIN

        }
        //check user exists in db or not
        const existingUser = await prisma.user.findUnique(
            { where: { email: adminData.email } }
        )
        if (!existingUser) {
            throw new Error("User Already exists")
        }
        console.log("Existing User", existingUser)
        console.log("Existing User", existingUser)

        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-type": "application/json",

            },
            body: JSON.stringify(adminData),

        })

    } catch (error) {
        console.log(error)
        console.log(error)
    }
}
seedAdmin()