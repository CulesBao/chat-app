import regexUtils from '../utils/regex.utils.js'
import dbUtils from '../utils/db.utils.js'

const registerValidation = async (req, res, next) =>{
    try{
        const obj = req.body
        if (!regexUtils.onValidEmail(obj.email))
            return res.status(400).json({message: "Invalid email. Email should be example@gmail.com"})
        if (await dbUtils.isEmailExist(obj.email))
            return res.status(400).json({message: "Email is already existed"})

        if (!regexUtils.onValidUsername(obj.username))
            return res.status(400).json({message: "Invalid username. Username include: lowcase letter, numbers, dots, underscores, and it must be 6-16 characters long"})
        if (await dbUtils.isUsernameExist(obj.username))
            return res.status(400).json({message: "Username is already existed"})

        if (!regexUtils.onValidPassword(obj.password))
            return res.status(400).json({message: "Invalid passowrd. Password include: one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long"})

        if (!regexUtils.onValidName(obj.name))
            return res.status(400).json({message: "Invalid name. Please type your name correctly"})

        next()
    }
    catch(err){
        console.log("Loi o authMiddleware: ", err)
        return res.status(400).json({message: "Error: " + err})
    }
}

const loginValidation = (req, res, next) => {
    try{
        const obj = req.body
        if (!regexUtils.onValidUsername(obj.username))
            return res.status(400).json({message: "Invalid username. Username include: lowcase letter, numbers, dots, underscores, and it must be 6-16 characters long"})

        if (!regexUtils.onValidPassword(obj.password))
            return res.status(400).json({message: "Invalid passowrd. Password include: one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long"})

        next()
    }
    catch(err){
        console.log("Loi o authMiddleware: ", err)
        return res.status(400).json({message: "Error: " + err})
    }
}


export default {loginValidation, registerValidation}