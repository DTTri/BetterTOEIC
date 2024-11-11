import express, { Express, json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import { practiceRouter, testRouter } from './routes';
dotenv.config(); //configure env enviroment to use data from .env

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use('/api/test', testRouter);
app.use('/api/practice', practiceRouter);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });
