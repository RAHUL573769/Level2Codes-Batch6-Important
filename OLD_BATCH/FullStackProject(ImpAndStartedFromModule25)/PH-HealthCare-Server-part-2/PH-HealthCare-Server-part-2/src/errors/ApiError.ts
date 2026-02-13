export class ApiError extends Error {
    statusCode1: number
    constructor(statusCode: number, message: string, stack = "") {
        super(message)
        this.statusCode1 = statusCode
        if (stack) {
            this.cause = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}