import express from 'express'
import chatsController from '../../controller/chats.controller.js'

const chatRoutes = express.Router()

chatRoutes.post('/create-chat',  chatsController.createChat)
chatRoutes.get('/:userId', chatsController.findUserChats)
chatRoutes.get('/find/:firstId/:secondId',  chatsController.findChat)

export default chatRoutes