import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
    {
        members: Array
    },
    {
        timestamps: true
    }
)
const chats = mongoose.model('chats', chatsSchema)
export default chats