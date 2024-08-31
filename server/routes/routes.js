import authRoutes from './apis/auth.routes.js'
import express from 'express'

const routes = express.Router()

routes.use('/auth', authRoutes)
routes.get('/', (req, res) => {
    res.send("This is chat-app presented by Cules")
})

export default routes