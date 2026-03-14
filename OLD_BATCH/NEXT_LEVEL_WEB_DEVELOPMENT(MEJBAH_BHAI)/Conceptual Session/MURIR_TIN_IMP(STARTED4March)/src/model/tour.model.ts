import { model, Schema } from "mongoose"
import { ITour } from "../interface/tour.interface"
import slugify from "slugify"


const tourSchema = new Schema<ITour>({
    name: {
        type: String,
        required: true
    },
    durationHours: {
        type: Number
    },
    ratingAverage: {
        type: Number
    },
    ratingQuality: {
        type: Number
    },
    price: { type: Number },
    imageCover: {
        type: String
    },
    images: [String],
    createdAt: { type: Date },
    startDates: [Date],
    startLocation: { type: String },
    location: [String],
    slug: String




}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })
//pRE Hook for Query Middleware
// import { Query } from "mongoose";

// userSchema.pre(/^find/, function (this: Query<IUser, IUser>, next: NextFunction) {
//     this.where({ userStatus: "active" });
//     next();
// })
tourSchema.virtual("durationDays").get(function () {
    return this.durationHours / 24
})
tourSchema.pre("save", function (next) {

    this.slug = slugify(this.name, { lower: true })
    next
})
const Tour = model<ITour>('Tour', tourSchema)
export default Tour