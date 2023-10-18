import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import Main from "./Main";

import './assets/css/global.css';
import {StoreContextProvider} from "./app/store/Store";
import {AuthProvider} from "./app/AuthProvider";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter>
    <AuthProvider>
        <Main />
    </AuthProvider>
</BrowserRouter>);

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/