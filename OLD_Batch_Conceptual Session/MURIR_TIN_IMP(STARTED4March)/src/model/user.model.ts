import { model, Query, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import { NextFunction } from "express";

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
//pRE Hook for Query Middleware
// import { Query } from "mongoose";

userSchema.pre(/^find/, function (this: Query<IUser, IUser>, next) {
    this.where({ userStatus: "active" });
    next;
})
const User = model<IUser>('User', userSchema)
export default User