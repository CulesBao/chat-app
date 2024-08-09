import users from '../models/users.models.js'
import bcrypt from 'bcrypt'

const isEmailExist = async(email) => {
    try{
        const user = await users.findOne({email})
        return !!user
    }
    catch(err){
        console.log("Loi o db.utils: ", err)
        throw err
    }
}

const isUsernameExist = async(username) => {
    try{
        const user = await users.findOne({username})
        return !!user
    }
    catch(err){
        console.log("Loi o db.utils: ", err)
        throw err
    }
}

const hashPassword = async(password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (err) {
        console.log("Error in hashPassword: ", err)
        throw err
    }
}

export default {isEmailExist, isUsernameExist, hashPassword}