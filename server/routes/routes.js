import authRoutes from './auth.routes.js'
import express from 'express'

const routes = express.Router()

routes.use('/auth', authRoutes)

export default routes