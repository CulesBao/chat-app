import express from 'express'
import messagesController from '../../controller/messages.controller.js'
const messageRoutes = express.Router()

messageRoutes.post('/create-message', messagesController.createMessages)
messageRoutes.get('/get-messages/:chatId', messagesController.getMessages)
 
export default messageRoutes