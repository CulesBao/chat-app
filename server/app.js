import express from 'express'
import dotenv from 'dotenv'
import connectDB from './models/db.js'
import routes from './routes/routes.js'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: '*',  // Hoặc chỉ định domain cụ thể nếu bạn không muốn cho phép mọi domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
dotenv.config()
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routes)

app.listen(process.env.PORT, () => {
    console.log('Server running at localhost:3000')
})
// ssh -i "chat.pem" ubuntu@ec2-54-162-188-130.compute-1.amazonaws.com