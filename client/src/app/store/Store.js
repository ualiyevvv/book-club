// import {makeAutoObservable} from "mobx";
import React, {useContext, useEffect, useState} from "react";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import {createContext} from "react";
import useURLState from "../../context/hooks/url_state/useURLState";
import useAdaptive from "../../context/hooks/adaptive/useAdaptive";

export default class Store {
    user = {
        test: 'test'
    };
    isAuth = false;
    isLoading = false;
    // constructor() {
    //     makeAutoObservable(this);
    // }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user
    }
    setLoading(bool) {
        this.isLoading = bool;
    }

    getAuth() {
        return this.isAuth
    }

    // async login(email, password) {
    //     try {
    //         const response = await AuthService.login(email, password);
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true)
    //         this.setUser(response.data.user)
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    async login(email) {
        try {
            const response = await AuthService.login(email);

            // localStorage.setItem('token', response.data.accessToken);
            // this.setAuth(true)
            // this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email) {
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

    // async sendCode(email) {
    //     try {
    //         const response = await AuthService.sendCode(email);
    //
    //         console.log('STOREEEEE RESPONSE SERVER API', response)
    //         // localStorage.setItem('token', response.data.accessToken);
    //         // this.setAuth(true)
    //         //посмотреть что возвращает сервер и насколько чувствительные данные, если норм то засетить, чтобы потом на шагах отлавливать в форма авторизации
    //         // this.setUser(response.data.user)
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    async checkCode(email, code) {
        try {
            const response = await AuthService.checkCode(email, code);

            console.log('STOREEEEE RESPONSE SERVER API', response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }



    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, {
                withCredentials: true,
                baseURL: API_URL,
            })
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
            // console.log('AXIOOOOS', this)

        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }


}

const store = new Store()

const StoreContext = createContext();
const useStoreContext = () => useContext(StoreContext);
function StoreContextProvider({children}) {


    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(store.user)
    }, [store]);

    return(<StoreContext.Provider value={{user, store, URLStateHandler, adaptiveHandler}}>
        {children}
    </StoreContext.Provider>)
}

export {StoreContextProvider, useStoreContext}