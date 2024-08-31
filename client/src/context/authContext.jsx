import { createContext, useCallback, useEffect, useState } from "react";
import service from '../utils/service.js'
import { useNavigate } from 'react-router-dom'; 

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        username: "",
        password: "",
        name: ""
    });
    
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const navigate = useNavigate();  
    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        
        const response = await service.postRequest(`${service.baseUrl}/auth/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);

        if (response.status === 400) {
            setRegisterError(response);
        } else {
            navigate('/login'); 
            setUser(response);
        }
    }, [registerInfo, navigate]);   

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);
    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        try {
            const response = await service.postRequest(`${service.baseUrl}/auth/login`, JSON.stringify(loginInfo));
            setIsLoginLoading(false);
    
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.token));
                
                const token = JSON.parse(localStorage.getItem("token"));
                const userResponse = await service.getRequest(`${service.baseUrl}/auth/find-by-token`, token);
                
                if (userResponse.status === 200) {
                    setUser(userResponse.name);
                    navigate('/chat'); 
                } else {
                    setLoginError(userResponse);
                }
            } else if (response.status >= 400) {
                setLoginError(response.message);
            }
        } catch (err) {
            setIsLoginLoading(false);
            setLoginError({ status: 500, message: err.message });
        }
    }, [loginInfo, navigate]);
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            service.getRequest(`${service.baseUrl}/auth/find-by-token`, token)
            .then(async (response) => {
                if (response.status === 200) {
                    setUser(response.name);
                } else if (response.status >= 400) {
                    setUser(null);
                    localStorage.removeItem("token");
                }
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem("token");
            });
        }
    }, []);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate('/login');
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            loginInfo,
            updateLoginInfo,
            loginUser,
            loginError,
            isLoginLoading,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
