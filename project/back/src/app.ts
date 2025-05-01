import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes, taskRoutes} from './routes/index.route';
import { apiLimiter } from './middlewares/index';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Aplicar el rate limiter a todas las solicitudes
app.use(apiLimiter);

app
.use('/api/tasks', taskRoutes)
.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('API funcionando');
});

export default app;
