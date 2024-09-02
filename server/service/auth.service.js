import users from '../models/users.models.js'
import bcrypt from 'bcrypt'
import jwtUtls from '../utils/jwt.utls.js'
import dbUtils from '../utils/db.utils.js'

const createUser = async(user) => {
    try{
        user.password = await dbUtils.hashPassword(user.password)
        const newUser = new users(user)
        await newUser.save()
        return {
            status: 200,
            message: "Register complete!"
        }
    }
    catch(err){
        console.log("Loi o authService: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

const login = async(obj) => {
    try{
        let username = obj.username
        const user = await users.findOne({username});
        console.log(user)
        if (!user )
            return{
                status: 400,
                message: "Wrong username or password"
            }
        if (await bcrypt.compare(obj.password, user.password)){
            const token = jwtUtls.createToken(user.id)

            return{
                status: 200,
                token: token, 
                message: "Login completed!"
            }
        }
        else
            return{
                status: 400,
                message: "Wrong username or password"
            }
    }
    catch (err) {
        console.log("Error in authService: ", err)
        throw err
    }
}

const findUser = async (_id) => {
    try {
        const user = await users.findOne({ _id });
        if (!user) 
            return {
                status: 400,
                message: 'Can\'t found!'
            }
        return {
            status: 200,
            username: user.username
        }
    } catch (err) {
        console.log("Error in authService: ", err);
        return {
            status: 500,
            message: err
        }
    }
}

const token = async (tokenHeader) => {
    try{
        const decoded = await jwtUtls.verifyToken(tokenHeader)
        const id = decoded.id
        const username = await findUser(id)
        if (!username)
            return {
            status: 400,
            message: "Error"
            }
        return {
            status: 200,
            username: username.username
        }
    }
    catch (err) {
        console.log("Error in authService: ", err);
        return {
            status: 500,
            message: err
        }
    }
}

export default {createUser, login, findUser, token}