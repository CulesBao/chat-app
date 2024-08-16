import users from '../models/users.models.js'
import bcrypt from 'bcrypt'

const createUser = async(user) => {
    try{
        const newUser = new users(user)
        await newUser.save()
        return {message: "Register complete!"}
    }
    catch(err){
        console.log("Loi o authService: ", err)
        throw new Error("Error in authService: " + err)
    }
}

const login = async(obj) => {
    try{
        let username = obj.username
        const user = await users.findOne({username});
        console.log(user)
        if (!user )
            return{
                tf: false
            }
        if (await bcrypt.compare(obj.password, user.password))
            return{
                tf: true,
                id: user._id
            }
        else
            return{
                tf: false
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
            return false
        return user;
    } catch (err) {
        console.log("Error in authService: ", err);
        throw new Error("Error in authService: " + err);
    }
}

export default {createUser, login, findUser}