import { model, Schema } from "mongoose"
import { ITour } from "../interface/tour.interface"
import { IReview } from "../interface/review.interface"


const reviewSchema = new Schema<IReview>({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "Tour"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }




})
//pRE Hook for Query Middleware
// import { Query } from "mongoose";

// userSchema.pre(/^find/, function (this: Query<IUser, IUser>, next: NextFunction) {
//     this.where({ userStatus: "active" });
//     next();
// })
const Review = model<IReview>('Review', reviewSchema)
export default Review;