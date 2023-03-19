import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const CONNECTION_URL=process.env.CONNECTION_URL



mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true })
                .then(()=>app.listen(PORT,()=>console.log(`server running up the hill at ${PORT} mil/hr`)))
                .catch((error)=> console.log(error.message))



app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors())

// it means all the routes of post will start with /posts
app.use('/posts',postRouter)
app.use('/users', userRouter)

