import User from "../model/user.model"

const createUserServices = async (userData: any) => {


    const result = await User.create(userData)
    return result;
}
const getUsersServices = async () => {
    const result = await User.find();
    return result
}


export const UserService = { getUsersServices, createUserServices }