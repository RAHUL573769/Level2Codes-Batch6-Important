import { IUser } from "../interface/user.interface";
import User from "../model/user.model"

const createUserServices = async (userData: any) => {


    const result = await User.create(userData)
    return result;
}
const getUsersServices = async () => {
    const result = await User.find();
    return result
}
const getSingleUserServices = async (id: string): Promise<IUser | null> => {

    const result = await User.findById(id)
    return result
}
const updateUserServices = () => { }
const deleteUserServices = () => { }

export const UserService = { deleteUserServices, updateUserServices, getUsersServices, createUserServices, getSingleUserServices }