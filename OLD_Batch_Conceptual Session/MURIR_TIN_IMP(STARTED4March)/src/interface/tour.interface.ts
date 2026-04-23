export interface ITour{
    name: string
    durationHours: number
    ratingAverage: number
    ratingQuality: number
    price: number
    imageCover: string
    images: string[]
    createdAt: Date
    startDates: Date[]
    startLocation: string
    location: string[]
    slug:string
}