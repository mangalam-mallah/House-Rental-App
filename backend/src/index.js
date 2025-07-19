import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js'
import propertyRouter from './routes/property.route.js'
import inquiryRouter from './routes/inquiry.route.js'

dotenv.config({quiet : true})

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use('/api/users', userRouter)
app.use('/api/property', propertyRouter)
app.use('/api/inquiry', inquiryRouter)

app.get('/', (req, res) => {
    res.send("Hello")
})

connectDB();


app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})