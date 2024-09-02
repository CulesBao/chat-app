import authRoutes from './apis/auth.routes.js'
import chatsRoutes from './apis/chats.routes.js'
import messagesRoutes from './apis/messages.routes.js'
import express from 'express'

const routes = express.Router()

routes.use('/auth', authRoutes)
routes.use('/chats', chatsRoutes)
routes.use('/messages', messagesRoutes)
routes.get('/', (req, res) => {
    res.send("This is chat-app presented by Cules")
})

export default routes