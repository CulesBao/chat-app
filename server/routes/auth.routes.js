import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import authController from '../controller/auth.controller.js'

const authRoutes = express.Router()

authRoutes.post('/register', authMiddleware.registerValidation, authController.register)
authRoutes.post('/login', authMiddleware.loginValidation,  authController.login)

export default authRoutes