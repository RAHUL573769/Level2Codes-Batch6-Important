import { IRequestUser } from './ReqUserIterface.ts';



declare global {
    namespace Express {
        interface Request {
            user: IRequestUser
        }
    }
}