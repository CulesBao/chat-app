import { useContext } from "react";
import { ChatContext } from '../context/chatContext.jsx'
import { AuthContext } from '../context/authContext.jsx'
import {Container, Stack} from 'react-bootstrap'
import UserChat from '../components/chat/UserChat.jsx'
import ChatBox from '../components/chat/ChatBox.jsx'
const Chat = () => {
    const user = useContext(AuthContext)
    const {userChats,
        isUserChatsLoading,
        updateCurrentChat} = useContext(ChatContext)
    return (<Container>
        {userChats.length < 1? null : 
            (
                <Stack direction="horizonal" className="align-items-start" gap={4}
                style={{ display: 'flex', flexDirection: 'row' }}>
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats?.map((chat, index) => {
                            return <div key = {index} onClick = {() => updateCurrentChat(chat)}>   
                                <UserChat chat = {chat} user = {user}/>
                            </div>
                        })}
                    </Stack>
                    <ChatBox></ChatBox>
                    {/* <p>Chattttttt</p> */}
                </Stack>
            )}
    </Container>);
}
 
export default Chat;