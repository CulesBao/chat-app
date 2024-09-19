import userFetchRecipientUser from '../../hooks/userFetchRecipient.js'
import { Stack } from 'react-bootstrap';
import avatar from '/home/cules/Desktop/chat-app/client/assets/profile.svg'
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/chatContext.jsx';
const UserChat = ({chat, user}) => {
    const { recipientUser } = userFetchRecipientUser(chat.members, user.user);
    const { onlineUsers } = useContext(ChatContext)
    const userStatus = onlineUsers?.some((user) => user?.id === recipientUser?._id)
    return (<Stack direction='horizonal' gap = {3} className = 'user-card align-items-center p-2 justify-content-between'
                role='button'>
        <div className='d-flex'>
            <div className='me-2'>
                <img src={avatar} height="35px" alt="" />
            </div>
            <div className='text-content'>
                <div className='name'>{recipientUser?.name ?? 'Loading....'}</div>
                <div className='text'>message</div>
            </div>
            <div className='d-flex flex-column align-items-end'>
                <div className='date'>12-12-2024</div>
                <div className='this-user-notifications'>2</div>
                <span className={userStatus ? "user-online" : ""}></span>
            </div>
        </div>
    </Stack>);
}
 
export default UserChat;