import FileController from "../controllers/FileController";
import express, { Router } from "express";
const fileRouter = Router();

fileRouter.get('/presigned-url', FileController.getPresignedUrl);


export default fileRouter;