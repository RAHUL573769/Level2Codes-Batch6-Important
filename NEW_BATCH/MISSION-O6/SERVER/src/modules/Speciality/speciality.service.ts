
import { Specialty } from "../../../generated/browser";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Specialty): Promise<Specialty> => {
    const speciality = await prisma.specialty.create({ data: payload })
    return speciality
}
const getSpeciality = async (): Promise<Specialty[]> => {
    const speciality = await prisma.specialty.findMany()
    return speciality
}
const deleteSpeciality = async (payloadId: string): Promise<Specialty> => {
    const speciality = await prisma.specialty.delete({
        where: {
            id: payloadId
        }
    })
    return speciality
}
export const SpecilityServices = { createSpeciality, getSpeciality, deleteSpeciality }