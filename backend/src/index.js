import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';

dotenv.config({quiet : true})

const app = express();
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
    connectDB();
})