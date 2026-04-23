import { ITour } from "../interface/tour.interface";
import Tour from "../model/tour.model";


const createTourServices = async (tourData: any) => {


    const result = await Tour.create(tourData)
    return result;
}
const getTourServices = async () => {
    const result = await Tour.find();
    return result
}
const getSingleTourServices = async (id: string): Promise<ITour | null> => {

    const result = await Tour.findById(id)
    return result
}
const updateTourServices = () => { }
const deleteTourServices = () => { }

export const TourService = { createTourServices, getSingleTourServices, getTourServices, updateTourServices, deleteTourServices }