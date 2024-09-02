import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
    {
        chatId: String,
        userId: String,
        text: String
    },
    {
        timestamps: true
    }
)
const messages = mongoose.model("Message", messagesSchema)
export default messages