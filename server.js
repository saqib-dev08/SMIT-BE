import express from 'express'
import { app } from './src/app.js'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js';

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listenung from Port: ${PORT}`);
    connectDB();
})