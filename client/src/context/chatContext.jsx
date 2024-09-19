import { createContext, useCallback, useEffect, useState } from 'react';
import service from '../utils/service.js';
import {io} from 'socket.io-client'

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
        const newSocket = io('http://localhost:4000')
        setSocket(newSocket)
        return () =>
            newSocket.disconnect()
    }, [user])
    useEffect(() => {
        if (socket == null)
            return
        const recipientId = currentChat?.members?.find(id => id != user?.id)
        socket.emit('sendMessage', {...newMessage, recipientId})
        // socket.on('getMessage')
    }, [newMessage])
    useEffect(() => {
        if (socket == null)
            return
        socket.on('getMessage', (res) => {
            console.log('res', res)
            if (currentChat?._id != res?.chatId)
                return
            setMessages((prev) => [...prev, res])
        })
        return () => {
            socket.off('getMessage')
        }
    }, [socket, currentChat])
    useEffect(() => {
        if (socket === null)
            return
        socket.emit('addOnlineUser', user?.id)
        socket.on('getOnlineUsers', (res) => {
            console.log('online user', res)
            setOnlineUsers(res)
            return () => {
                socket.off('getOnlineUsers')
            }
        })
    }, [socket])
    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const sendTextMessage = useCallback(async (textMessage, senderId, currentChatId, setTextMessage) => {
        if (!textMessage) return;
        if (!senderId || !currentChatId) return;
        const response = await service.postRequest(`${service.baseUrl}/messages/create-message`, JSON.stringify({
            chatId: currentChatId,
            userId: senderId,
            text: textMessage
        }));
        if (response.status >= 400) 
            return setSendTextMessageError(response.message);
        setNewMessage(response.message);
        setMessages((prev) => [...prev, response.message]);
        setTextMessage("");
    }, [socket]);

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
                    setUserChats(response.chat);
                } else {
                    setIsUserChatsLoading(false);
                }
            } catch (error) {
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
                    setMessages(response.data);
                } else {
                    setIsMessagesLoading(false);
                }
            } catch (error) {
                setIsMessagesLoading(false);
                setMessagesError(error.message || 'Something went wrong');
                console.error('Error fetching messages:', error);
            }
        };
        getMessages();
    }, [currentChat]);

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            updateCurrentChat,
            currentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            newMessage,
            setNewMessage,
            onlineUsers
        }}>
            {children}
        </ChatContext.Provider>
    );
};
