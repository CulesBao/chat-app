import users from '../models/users.models.js'

const createUser = async(user) => {
    try{
        const newUser = new users(user)
        await newUser.save()
        return {message: "Register complete!", newUser}
    }
    catch(err){
        console.log("Loi o authService: ", err)
        throw new Error("Error in authService: " + err)
    }
}

export default {createUser}