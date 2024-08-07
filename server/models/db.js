import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './users.models.js'

dotenv.config()
console.log(process.env.ATLAS_URI)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        })
        console.log('MongoDB connected...')
        // console.log(await users.find({}))
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

export default connectDB