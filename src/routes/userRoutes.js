import express from 'express';
import { userUpdate, getUser} from '../controllers/userController.js';

export const userRoutes = express.Router();

userRoutes.get("/", getUser);

userRoutes.get("/update-user", userUpdate);

