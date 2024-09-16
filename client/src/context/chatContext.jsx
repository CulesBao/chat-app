import {createContext, useCallback, useEffect, useState} from 'react'
import service from '../utils/service.js'

export const ChatContext = createContext()
export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)

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
                    // console.log('response', response);
                    setIsUserChatsLoading(false);
                    if (response.status >= 400) {
                        return setUserChatsError(response.message);
                    }
                    setUserChats(response.chat)
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
        useEffect(() => {
            const getMessages = async () => {
                try {
                    setMessagesError(null);
                    setIsMessagesLoading(true);
                    if (currentChat?._id) {
                        const response = await service.getRequest(`${service.baseUrl}/messages/get-messages/${currentChat._id}`);
                        setIsMessagesLoading(false);
                        if (response.status >= 400) {
                            return setMessagesError(response.message);
                        }
                        setMessages(response.data)
                    }
                    else{
                        setIsMessagesLoading(false);
                    }
                } 
                catch (error) {
                    setIsMessagesLoading(false);
                    setMessagesError(error.message || 'Something went wrong');
                    console.error('Error fetching messages:', error);
                }
            };
            getMessages();
        }, [currentChat]);
    
    return (<ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError   
    }}>
        {children}
    </ChatContext.Provider>)
}