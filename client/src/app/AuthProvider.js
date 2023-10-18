import React, { createContext, useContext, useState } from 'react';
import AuthService from "./services/AuthService";
import axios from "axios";
import {API_URL} from "./http";
import useURLState from "../context/hooks/url_state/useURLState";
import useAdaptive from "../context/hooks/adaptive/useAdaptive";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const login = async (email) => {
        try {
            const response = await AuthService.login(email);

            setUser(response.data); // Предполагается, что сервер вернул данные пользователя
        } catch (error) {
            console.error('Ошибка аутентификации', error);
        }
    };

    const registration = async (email) => {
        try {
            const response = await AuthService.registration(email);

            console.log('STOREEEEE RESPONSE SERVER API', response)
            // localStorage.setItem('token', response.data.accessToken);
            // this.setAuth(true)
            // this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


    const checkCode = async (email, code) => {
        try {
            const response = await AuthService.checkCode(email, code);

            console.log('STOREEEEE RESPONSE SERVER API', response)
            localStorage.setItem('token', response.data.accessToken);
            setAuth(true)
            setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }



    const logout = async () =>  {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token')
            setAuth(false)
            setUser({})
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const checkAuth = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, {
                withCredentials: true,
                baseURL: API_URL,
            })
            localStorage.setItem('token', response.data.accessToken);
            setAuth(true)
            setUser(response.data.user)
            // console.log('AXIOOOOS', this)

        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }



    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();


    return (
        <AuthContext.Provider value={{ user, isAuth, isLoading, login, logout, checkAuth, checkCode, registration, adaptiveHandler, URLStateHandler }}>
            {children}
        </AuthContext.Provider>
    );
}
