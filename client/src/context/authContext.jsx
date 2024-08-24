import { createContext, useCallback, useEffect, useState } from "react";
import service from '../utils/service.js'
import { useNavigate } from 'react-router-dom'; 

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        username: "",
        password: "",
        name: ""
    })
    
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState(null)

    const navigate = useNavigate();  
    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        
        setRegisterInfo((currentInfo) => {
            
            service.postRequest(`${service.baseUrl}/auth/register`, JSON.stringify(currentInfo))
                .then(response => {
                    setIsRegisterLoading(false);
    
                    if (response.status == 400) {
                        return setRegisterError(response);
                    }
                    navigate('/login'); 
                    setUser(response);
                });
    
            return currentInfo;
        });
    }, []);   

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])
    
    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);
        
        setLoginInfo((currentInfo) => {
            
            service.postRequest(`${service.baseUrl}/auth/login`, JSON.stringify(currentInfo))
                .then(response => {
                    setIsLoginLoading(false);
    
                    if (response.status == 200) {
                        setUser(response);
                        localStorage.setItem("token", JSON.stringify(response.token))
                        navigate('/chat'); 
                    } else if (response.status >= 400) {
                        setLoginError(response);
                    }
    
                    setUser(response);
                })
                .catch(err => {
                    setIsLoginLoading(false);
                    setLoginError({ status: 500, message: 'Internal server error' });
                });
    
            return currentInfo;
        });
    }, []);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token){
            service.getRequest(`${service.baseUrl}/auth/me`, token)
            .then((response) => {
                if (response.status == 200){
                    setCurrentUser(response.username)
                    navigate('/chat')
                }
                else if (response.status >= 400){
                    setCurrentUser(null)
                    localStorage.removeItem("token")
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
            });
        }
    }, [])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate('/login');
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ 
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            loginInfo,
            setLoginInfo,
            updateLoginInfo,
            loginUser,
            loginError,
            isLoginLoading,
            currentUser,
            setCurrentUser, 
            logoutUser
         }}>
            {children}
        </AuthContext.Provider>
    );
};
