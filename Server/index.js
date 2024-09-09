import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB");
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})