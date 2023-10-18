import React, {useContext, useEffect, useState} from "react";
import Authentication from "../pages/auth/main/Authentication";
import Loader from "../shared/ui/loader/Loader";
import AppContainer from "../pages/business_client/AppContainer";
import {useAuth} from "../app/AuthProvider";
import Overlay from "../shared/ui/overlay/Overlay";

export default function PageNew({children}) {

    const {user, isLoading, isAuth, checkAuth} = useAuth()

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
    }
    // else if (!isAuth) {
    //     return (<Authentication />)
    // }
    else {
        return (<>
            {children}
        </>)
    }




}