import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст аутентификации
const AuthContext = createContext(null);

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        // Check if auth data exists in localStorage
        const savedAuth = localStorage.getItem('authData');
        if (savedAuth) {
            try {
                return JSON.parse(savedAuth);
            } catch (e) {
                console.error("Error parsing stored auth data", e);
            }
        }
        
        // Default state from env variables
        return {
            username: import.meta.env.VITE_USER,
            password: import.meta.env.VITE_PASSWORD,
            // Преобразуем VITE_USERID в число с помощью parseInt
            UserId: parseInt(import.meta.env.VITE_USERID, 10),
            // Add the API URL to authData
            url: import.meta.env.VITE_URL ,
            isAuthenticated: false
        };
    });

    // Save auth state to localStorage whenever it changes
    useEffect(() => {
        if (authData.isAuthenticated) {
            localStorage.setItem('authData', JSON.stringify(authData));
        } else {
            localStorage.removeItem('authData');
        }
    }, [authData]);

    // Функция для входа в систему
    const login = (username, password) => {
        // Preserve UserId and URL when setting auth data
        const UserId = parseInt(import.meta.env.VITE_USERID, 10) ;
        const url = import.meta.env.VITE_URL ;
        setAuthData({
            username,
            password,
            UserId,
            url,
            isAuthenticated: true
        });
    };

    // Функция для выхода из системы
    const logout = () => {
        setAuthData({
            username: '',
            password: '',
            UserId: parseInt(import.meta.env.VITE_USERID, 10) ,
            url: import.meta.env.VITE_URL,
            isAuthenticated: false
        });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }
    return context;
};