import express from 'express'
import dotenv from 'dotenv'
import connectDB from './models/db.js'
import routes from './routes/routes.js'

dotenv.config()
const app = express()
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routes)

app.listen(process.env.PORT, () => {
    console.log('Server running at localhost:3000')
})
// ssh -i "chat-app.pem" ubuntu@ec2-3-81-83-225.compute-1.amazonaws.com