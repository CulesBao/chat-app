import chatsService from '../service/chats.service.js'

const createChat = async(req, res) => {
    try{
        const {firstId, secondId} = req.body
        const response = await chatsService.createChat(firstId, secondId)
        let {status, ...data} = response

        res.status(status).json(data)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: err})
    }
}
const findUserChats = async(req, res) => {
    try{
        const userId = req.params.userId
        const response = await chatsService.findUserchats(userId)
        let {status, ...data} = response

        res.status(status).json(data)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: err})
    }
}
const findChat = async(req, res) => {
    try{
        const {firstId, secondId} = req.params
        const response = await chatsService.findChat(firstId, secondId)
        let {status, ...data} = response

        res.status(status).json(data)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: err})
    }
}
export default {createChat, findUserChats, findChat}