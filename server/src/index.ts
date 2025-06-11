import express, { Express, json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import {
  practiceRouter,
  roadmapRouter,
  testRouter,
  vocabRouter,
  authRouter,
  userRouter,
  fileRouter,
  swTestRouter,
} from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import forumRouter from './routes/ForumRoutes';
import chatRouter from './routes/ChatRoutes';
dotenv.config(); //configure env enviroment to use data from .env

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://localhost:3000',
  'https://localhost:5173',
  'https://localhost:8080',

  'https://bettertoeic.id.vn',
  'https://bettertoeic.vercel.app',
  'https://bettertoeic-dttris-projects.vercel.app',
  'https://bettertoeic-git-production-dttris-projects.vercel.app',
  'https://bettertoeic-mjjt7l9fl-dttris-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // if (origin.match(/^https:\/\/bettertoeic-.*\.vercel\.app$/)) {
      //   return callback(null, true);
      // }

      // Reject all other origins
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
const file = fs.readFileSync(path.resolve('docs/swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/test', testRouter);
app.use('/api/practice', practiceRouter);
app.use('/api/roadmap', roadmapRouter);
app.use('/api/file', fileRouter);
app.use('/api/vocab', vocabRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/forum', forumRouter);
app.use('/api/chat', chatRouter);
app.use('/api/swtest', swTestRouter);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });
