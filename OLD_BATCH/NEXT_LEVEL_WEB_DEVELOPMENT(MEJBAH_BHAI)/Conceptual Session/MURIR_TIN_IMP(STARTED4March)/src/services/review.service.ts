import { IReview } from "../interface/review.interface";
import Review from "../model/review.model";

const createReviewServices = async (reviewData: any) => {


    const result = await Review.create(reviewData)
    return result;
}
const getReviewServices = async () => {
    const result = await Review.find();
    return result
}
const getSingleReviewServices = async (id: string): Promise<IReview | null> => {

    const result = await Review.findById(id)
    return result
}
const updateReviewServices = () => { }
const deleteReviewServices = () => { }

export const ReviewService = { deleteReviewServices, updateReviewServices, getReviewServices, createReviewServices, getSingleReviewServices }