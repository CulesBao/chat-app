import userFetchRecipientUser from '../../hooks/userFetchRecipient.js'
import { Stack } from 'react-bootstrap';
import avatar from '/home/cules/Desktop/chat-app/client/assets/profile.svg'
const UserChat = ({chat, user}) => {
    const { recipientUser, error } = userFetchRecipientUser(chat.members, user.user);
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
                <div className='date'>12-12-20244</div>
                <div className='this-user-notifications'>2</div>
                <span className='user-online'></span>
            </div>
        </div>
    </Stack>);
}
 
export default UserChat;