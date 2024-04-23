import cors from 'cors';
import express from 'express';
import env from './env';
import todoRoutes from './routes/todo';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(env.LOCALHOST_PORT, () => {
  console.log(`Connected to port:${env.LOCALHOST_PORT}`);
});
