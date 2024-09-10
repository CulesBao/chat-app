import chats from '../models/chats.models.js'
import jwtUtls from '../utils/jwt.utls.js'
const createChat = async(firstId, secondId) =>{
    try{
        const chat = await chats.findOne({
            members: {$all: [firstId, secondId]}
        })
        if (chat)
            return{
            status: 200,
            message: "Chat is already existed!"
        }
        const newChat = await chats({
            members: [firstId, secondId ]
        })
        await newChat.save()
        return {
            status: 200,
            message: "Create chat successful!"
        }
    }
    catch(err){
        console.log("Loi o chatservice: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

const findUserchats = async(token) =>{
    try{
        const user = await jwtUtls.verifyToken(token)
        const chat = await chats.findOne({
            members: {$in: [user.id]}
        })
        const members = chat.members.filter(member => member !== user.id)
        return {
            status: 200,
            message: "List",
            members
        }
    }
    catch(err){
        console.log("Loi o chatservice: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

const findChat = async(firstId, secondId) =>{
    try{
        const chat = await chats.findOne({
            members: {$all: [firstId, secondId]}
        })
        if (chat)
            return{
            status: 200,
            message: "List in here",
            chat
        }
    }
    catch(err){
        console.log("Loi o chatservice: ", err)
        return {
            status: 500,
            message: err
        }
    }
}

export default {createChat, findUserchats, findChat}