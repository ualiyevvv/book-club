import React, {useState} from 'react'


export default function useAuthNew() {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    // const


    return ({
        setUser,
        setIsAuth,
    })
}