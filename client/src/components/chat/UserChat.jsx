import userFetchRecipientUser from '../../hooks/userFetchRecipient.js'
import { Stack } from 'react-bootstrap';
const UserChat = (userId) => {
    const { recipientUser, error } = userFetchRecipientUser(userId);

    return (<Stack direction='horizonal' gap = {3} className = 'user-card align-items-center p-2 justify-content-between'>
        <div className='d-flex'>
            <div className='me-2'>A</div>
            <div className='text-content'>
                <div className='name'>{recipientUser}</div>
                <div className='text'>message</div>
            </div>
            <div className='d-flex flex-column align-items-end'>
                <div className='date'>12-12-20244</div>
                <div className='this-user-notification'>2</div>
                <span className='user-online'></span>
            </div>
        </div>
    </Stack>);
}
 
export default UserChat;