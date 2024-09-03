import { useContext } from "react";
import { ChatContext } from '../context/chatContext.jsx'

const Chat = () => {
    const {userChats,
        isUserChatsLoading,
        userChatsError} = useContext(ChatContext)
    console.log("userChats", userChats)
    return (<>Chat page</>);
}
 
export default Chat;