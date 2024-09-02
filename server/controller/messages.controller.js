import messagesService from '../service/message.service.js'

const createMessages = async(req, res) => {
    try{
        const messageObj = req.body
        const response = await messagesService.createMessages(messageObj)
        let {status, ...data} = response

        return res.status(status).json(data)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: "Error in authController: " + err})
    }
}
const getMessages = async(req, res) => {
    try{
        const chatId = req.params.chatId
        const response = await messagesService.getMessages(chatId)
        let {status, ...data} = response

        return res.status(status).json(data)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: "Error in authController: " + err})
    }
}

export default {createMessages, getMessages}