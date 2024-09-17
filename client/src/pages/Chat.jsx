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
    if (userChats != null) {
        return (
            <Container>
                <Stack direction="horizontal" className="align-items-start" gap={4} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats?.map((chat, index) => (
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </Stack>
                    <ChatBox />
                </Stack>
            </Container>
        );
    } else {
        return (<p>Loading....</p>);
    }
}
 
export default Chat;