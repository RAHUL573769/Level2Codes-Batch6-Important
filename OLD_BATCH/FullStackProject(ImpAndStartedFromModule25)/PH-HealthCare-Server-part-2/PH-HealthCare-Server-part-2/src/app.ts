import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/User/user.routes';
import { AdminRoutes } from './app/modules/Admin/admin.routes';
import { loginRouter } from './app/modules/Auth/auth.route';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads1", express.static("uploads1"));


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server.."
    })
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', AdminRoutes);
app.use('/api/v1/auth', loginRouter);
export default app;