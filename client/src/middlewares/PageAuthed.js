import React, {useContext, useEffect, useState} from "react";
import Authentication from "../pages/auth/main/Authentication";
import Loader from "../shared/ui/loader/Loader";
import AppContainer from "../pages/business_client/AppContainer";
import {useAuth} from "../app/AuthProvider";
import New from "../pages/business_client/New";

export default function PageAuthed({children}) {

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
        return (<Loader />)
    } else if (!isAuth) {
        return (<New />)
    }



    return (<>
        {children}
    </>)

}