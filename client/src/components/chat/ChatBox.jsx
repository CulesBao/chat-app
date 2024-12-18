import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import avatar from '/home/cules/Desktop/chat-app/client/assets/profile.svg'
import userFetchRecipientUser from "../../hooks/userFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, sendTextMessage} = useContext(ChatContext)
    const [textMessage, setTextMessage] = useState("")
    const {recipientUser} = userFetchRecipientUser(currentChat?.members, user)
    if (!currentChat) {
        return <p style={{ textAlign: "center", width: "100%" }}>No conversation selected yet</p>;
    }
    if (!recipientUser)
        return <p style={{textAlign: "center", width: "100%"}}>
        No conversation select yet</p>
    // console.log(textMessage)
    return (
        <Stack direction = 'vertical' gap ={4} className = "chat-box">
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
            <Stack direction="horizonal" gap = {3} className="chat-input flex-grow-0">
                <InputEmoji 
                    fontFamily="Be Vietnam Pro"
                    borderColor="rgba(72, 111, 222, 0.2)"
                    value={textMessage}
                    onChange={setTextMessage}
                />
                <button className="send-btn" onClick={() => sendTextMessage(textMessage, user.id, currentChat._id, sendTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                </button>
            </Stack>
        </Stack>
    );
}
 
export default ChatBox;