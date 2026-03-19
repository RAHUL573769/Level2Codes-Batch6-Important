import { prisma } from "../../../lib/prisma"

const getDoctorsService = async () => {
    const doctors = await prisma.doctor.findMany()
    return doctors

}

export const doctorService = { getDoctorsService }