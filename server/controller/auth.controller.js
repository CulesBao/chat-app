import authService from '../service/auth.service.js'

const register = async (req, res) => {
    try{
        const user = req.body
        const response = await authService.createUser(user)
        const {status, ...respone} = response

        return res.status(status).json(respone)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: "Error in authController: " + err})
    }
}

const login = async(req, res) => {
    try{
        const info = req.body
        const response = await authService.login(info)
        const {status, ...respone} = response

        return res.status(status).json(respone)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

const findUser = async(req, res) => {
    try{
        const id = req.params.id
        const response = await authService.findUser(id) 
        const {status, ...respone} = response
        
        return res.status(status).json(respone)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

const token = async(req, res) => {
    try{
        const tokenHeader = req.headers['authorization']
        const tokenH = tokenHeader.split(' ')[1];
        const response = await authService.token(tokenH)
        const {status, ...respone} = response

        return res.status(status).json(respone)
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(500).json({message: "Error in authController: " + err})
    }
}

export default {register, login, findUser, token}