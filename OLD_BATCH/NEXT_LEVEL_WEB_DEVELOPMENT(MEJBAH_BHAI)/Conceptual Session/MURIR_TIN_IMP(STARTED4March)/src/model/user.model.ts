import { model, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        // enum:{type:String,values:["user","admin"]},
        default: "user"
    },
    userStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    }



})

const User = model<IUser>('User', userSchema)
export default User