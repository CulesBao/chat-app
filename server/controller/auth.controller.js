import authService from '../service/auth.service.js'
import dbUtils from '../utils/db.utils.js'

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
        if (await dbUtils.isUserExisted(obj))
            return res.status(400).json({message: "Wrong username or password. Please try again!"})
        return res.status(200).json({message: "Login completed!"})
    }
    catch(err) {
        console.log('Loi o authController: ', err)
        return res.status(400).json({message: "Error in authController: " + err})
    }
}

export default {register, login}