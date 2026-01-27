export const paginationFunction = (options: { page?: number, limit?: number, sortBy?: string, sortOrder?: string }) => {

    const page: number = Number(options.page) || 1
    const limit: number = Number(options.limit) || 10
    const skip: number = (Number(page)) * limit
    const sortBy: string = options.sortBy || "createdAt"
    const sortOrder: string = options.sortOrder || "desc"
    return {
        page, limit, skip, sortBy, sortOrder
    }
}
