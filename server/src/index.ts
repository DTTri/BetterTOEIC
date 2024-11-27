import express, { Express, json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import { practiceRouter, roadmapRouter, testRouter, vocabRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
dotenv.config(); //configure env enviroment to use data from .env

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
const file = fs.readFileSync(path.resolve('docs/swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/test', testRouter);
app.use('/api/practice', practiceRouter);
app.use('/api/roadmap', roadmapRouter);
app.use('/api/vocab', vocabRouter);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });
