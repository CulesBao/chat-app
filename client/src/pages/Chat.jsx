import { useContext } from "react";
import { ChatContext } from '../context/chatContext.jsx'
import {Container, Stack} from 'react-bootstrap'
import UserChat from '../components/chat/UserChat.jsx'
const Chat = () => {
    const user = useContext(ChatContext)
    const {userChats,
        isUserChatsLoading,
        userChatsError} = useContext(ChatContext)
    return (<Container>
        {userChats.length < 1? null : 
            <Stack direction="horizonal" className="align-items-start" gap={4}>
                <Stack className="message-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatsLoading && <p>Loading...</p>}
                    {userChats.map((userId, index) => {
                        return <div key = {index}>   
                            <UserChat userId = {userId}/>
                        </div>
                    })}
                </Stack>
                <p>Chat box</p>
            </Stack>}
    </Container>);
}
 
export default Chat;