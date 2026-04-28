import express from 'express';
import getUser from '../controllers/userController.js';

export const userRoutes = express.Router();

userRoutes.get("/", getUser);