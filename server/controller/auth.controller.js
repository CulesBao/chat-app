import authService from '../service/auth.service.js'
import dbUtils from '../utils/db.utils.js'
import jwtUtls from '../utils/jwt.utls.js'

const register = async (req, res) => {
    try{
        const user = req.body
        user.password = await dbUtils.hashPassword(user.password)
        return (await authService.createUser(user))
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

const login = async(req, res) => {
    try{
        const obj = req.body
        const response = await authService.login(obj)
        if (!response.tf)
            return res.status(400).json({message: "Wrong username or password. Please try again!"})
        const token = jwtUtls.createToken(obj.username)
        return res.status(200).json({message: "Login completed!", id: response.id, token: token})
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

const findUser = async(req, res) => {
    try{
        const _id = req.params.id
        const user = await authService.findUser(_id) 
        if (user)
            return res.status(200).json({username: user.username, name: user.name})
        return res.status(400).json({message: "Can't found!"})
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

export default {register, login, findUser}