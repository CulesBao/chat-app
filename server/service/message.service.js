import messages from '../models/messages.models.js'

const createMessages = async (messageObj) => {
    try{
        const newMessage = new messages(messageObj)
        await newMessage.save()
        return {
            status: 200,
            message: newMessage
        }
    }
    catch(err){
        console.log("Loi o messageService: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

const getMessages = async (chatId) => {
    try{
        console.log(chatId)
        const data = await messages.find({
            chatId
        })
        return {
            status: 200,
            data
        }
    }
    catch(err){
        console.log("Loi o chatservice: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

export default {createMessages, getMessages}