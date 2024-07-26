import express from "express"
const app= express()
import 'dotenv/config'
import cors from 'cors'
import authRouter from './routes/auth.js'
import cookieParser from "cookie-parser"
import testRouter from './routes/test.js'
import userRouter from './routes/user.js'
import postRouter from './routes/posts.js'
import chatRouter from './routes/chats.js'
import messageRouter from './routes/message.js'

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/test',testRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/chats',chatRouter)
app.use('/api/messages',messageRouter)
app.listen(8800,()=>{
        console.log("server is runing on",8800)
})