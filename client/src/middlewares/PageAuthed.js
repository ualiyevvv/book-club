import React, {useContext, useEffect, useState} from "react";
import Authentication from "../pages/auth/main/Authentication";
import Loader from "../shared/ui/loader/Loader";
import AppContainer from "../pages/business_client/AppContainer";
import {useAuth} from "../app/AuthProvider";
import New from "../pages/business_client/New";
import Overlay from "../shared/ui/overlay/Overlay";
import {useNavigate} from "react-router-dom";

export default function PageAuthed({children}) {

    const {user, isLoading, isAuth, checkAuth} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user == null) {
            if(localStorage.getItem('token')) {
                checkAuth()
                console.log(JSON.stringify(user))
            }
        }
        console.log(user)
        console.log(isAuth)

    }, [user]);

    if (isLoading) {
        return (<Overlay><Loader /></Overlay>)
    } else if (!isAuth) {
        return (navigate('/'))
    }



    return (<>
        {children}
    </>)

}