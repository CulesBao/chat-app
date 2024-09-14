import {createContext, useEffect, useState} from 'react'
import service from '../utils/service.js'

export const ChatContext = createContext()
export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])

    useEffect(() => {
        const getUser = async () => {
            // const response = 
        }
        getUser()
    }, [])
    useEffect(() => {
        const getUserChats = async () => {
            try {
                setUserChatsError(null);
                setIsUserChatsLoading(true);
                let token = localStorage.getItem('token');
                token = JSON.parse(token);
                if (token) {
                    const response = await service.getRequest(`${service.baseUrl}/chats/`, token);
                    setIsUserChatsLoading(false);
                    if (response.status >= 400) {
                        return setUserChatsError(response.message);
                    }
                    setUserChats(response.members);
                } else {
                    setIsUserChatsLoading(false);
                }
            } 
            catch (error) {
                setIsUserChatsLoading(false);
                setUserChatsError(error.message || 'Something went wrong');
                console.error('Error fetching user chats:', error);
            }
        };
        getUserChats();
    }, [user]);
    
    return (<ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError
    }}>
        {children}
    </ChatContext.Provider>)
}