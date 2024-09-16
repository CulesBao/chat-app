import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import avatar from '/home/cules/Desktop/chat-app/client/assets/profile.svg'
import userFetchRecipientUser from "../../hooks/userFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from 'moment'

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, isMessagesLoading} = useContext(ChatContext)
    if (!currentChat) {
        return <p style={{ textAlign: "center", width: "100%" }}>No conversation selected yet</p>;
    }
    const {recipientUser} = userFetchRecipientUser(currentChat.members, user)
    if (!recipientUser)
        return <p style={{textAlign: "center", width: "100%"}}>
        No conversation select yet</p>
    // console.log(messages)
    return (
        <Stack gap ={4} className = "chat-box">
            <div className="chat-header">
                <img src={avatar} height="35px" alt="" />
                <strong>{recipientUser?.name}</strong>
            </div>
            <Stack gap = {3} className="messages">
                {messages && messages.map((message, index) => {
                    return (
                        <Stack key={index} style={{ height: 'auto', maxHeight: 'fit-content', flexGrow: 0 }} className={`${message?.userId === user.id ? "message self align-self-end flex-grow 0" : "message align-self-start flex-grow 0" }`}>
                            <span>{message.text}</span>
                            <span className = "message-footer">{moment(message.createdAt).calendar()}</span>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
}
 
export default ChatBox;