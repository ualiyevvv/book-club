import React, { createContext, useContext, useState } from 'react';
import AuthService from "./services/AuthService";
import axios from "axios";
import {API_URL} from "./http";
import useURLState from "../context/hooks/url_state/useURLState";
import useAdaptive from "../context/hooks/adaptive/useAdaptive";
import useRoom from "./hooks/useRoom";
import useOffer from "./hooks/useOffer";
import useVote from "./hooks/useVote";
import useAdmin from "./hooks/useAdmin";
import UserService from "./services/UserService";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(null);
    const [authState, setAuthState] = useState({
        type: '',
        email: '',
    });


    // сделать норм обработку ошибок, чтобы каждая функция не затирала состояние, а создать объект и положить в соответ свойства и по ним уже проверять в форме
    const login = async (email) => {
        setStatus(null);
        setAuthState({
            email: email,
            type: 'signin',
        });
        setLoading(true)
        try {
            const response = await AuthService.login(email);
            // console.log(response)
            setStatus(response.data); // Предполагается, что сервер вернул данные пользователя
        } catch (e) {
            // console.error('Ошибка аутентификации', e);
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    };

    const registration = async (email) => {
        setStatus(null);
        setAuthState({
            email: email,
            type: 'signup',
        });
        setLoading(true)
        try {
            const response = await AuthService.registration(email);

            setStatus(response.data)
            // console.log('STOREEEEE RESPONSE SERVER API', response)
            // localStorage.setItem('token', response.data.accessToken);
            // this.setAuth(true)
            // this.setUser(response.data.user)
        } catch (e) {
            // console.log(e.response?.data?.message);
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }


    const checkCode = async (email, code) => {
        // setError('');
        setLoading(true)
        try {
            const response = await AuthService.checkCode(email, code);

            console.log('STOREEEEE RESPONSE SERVER API', response)
            localStorage.setItem('token', response.data.accessToken);
            setAuth(true)
            setUser(response.data.user)
        } catch (e) {
            // console.log(e.response?.data?.message);
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }



    const logout = async () =>  {
        // setError('');
        setLoading(true)
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token')
            setAuth(false)
            setUser({})
        } catch (e) {
            // console.log(e.response?.data?.message);
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const checkAuth = async () => {
        // setError('');
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, {
                withCredentials: true,
                baseURL: API_URL,
            })
            localStorage.setItem('token', response.data.accessToken);
            setAuth(true)
            setUser(response.data.user)
            console.log('AXIOOOOS', response.data.user)

        } catch (e) {
            // console.log(e.response?.data?.message)
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const setName = async (name, userId) => {
        setLoading(true)
        try {
            const response = await AuthService.updateName(name, userId);

            console.log('USER RESPONSE SERVER API', response)
            setUser(response.data.user)
        } catch (e) {
            // console.log(e.response?.data?.message)
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    const makeAttendee = async (userId, qrHash) => {
        setLoading(true)
        try {
            const response = await UserService.makeAttendee(userId, qrHash);

            return response.data
        } catch (e) {
            // console.log(e.response?.data?.message)
            setError(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }



    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();
    const roomHandler = useRoom();
    const offerHandler = useOffer();
    const voteHandler = useVote();
    const adminHandler = useAdmin();

    const [voteViewSettingValue, setVoteViewSettingValue] = useState(localStorage.getItem('voteViewSettingValue') || null)

    return (
        <AuthContext.Provider
            value={{ user, error, setError, isAuth, isLoading, setLoading,
                status, setStatus, authState, setAuthState,
                login, logout, checkAuth, checkCode, registration, setName,
                adaptiveHandler, URLStateHandler, roomHandler, voteHandler,
                offerHandler, voteViewSettingValue, setVoteViewSettingValue,
                adminHandler, makeAttendee
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}
