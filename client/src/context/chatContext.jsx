import {createContext, useEffect, useState} from 'react'
import service from '../utils/service.js'

export const ChatContext = createContext()
export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    console.log('user', user);
    useEffect(() => {
        const getUserChats = async () => {
            try {
                setUserChatsError(null);
                setIsUserChatsLoading(true);
                if (user?._id) {
                    const response = await service.GetRequest(`${service.baseUrl}/chats/create-chat/${user._id}`);
                    setIsUserChatsLoading(false);
                    console.log('response', response);
                    if (response.status >= 400) {
                        return setUserChatsError(response.message);
                    }
                    setUserChats(response);
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