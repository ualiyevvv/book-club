import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import {AppContextProvider} from "./context/AppContext";
import Main from "./Main";

import './assets/css/global.css';
import Store from "./app/store/Store";

const store = new Store();

export const Context = createContext({
    store
})

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter><AppContextProvider><Context.Provider value={{store}}>
    <Main />
</Context.Provider></AppContextProvider></BrowserRouter>);

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/