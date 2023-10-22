import React from "react";
import AdminPage from "../pages/manager/AdminAllInOne";
import {useAuth} from "../app/AuthProvider";
import {useNavigate} from "react-router-dom";
import NotFound404 from "../pages/NotFound404";

export default function PageAdmin({children}) {

    const navigate = useNavigate();
    const {user, isLoading,setLoading, isAuth, checkAuth} = useAuth()

    if (isAuth && user?.role === 'ADMIN') {

        return(<>
            {children}
        </>)
    }

    return <NotFound404 />
}