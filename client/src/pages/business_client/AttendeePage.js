import React, {useEffect} from "react";
import {useAuth} from "../../app/AuthProvider";
import {useNavigate, useParams} from "react-router-dom";

export default function AttendeePage() {

    const navigate = useNavigate()

    const { qrHash } = useParams();
    const { user, isAuth, makeAttendee } = useAuth();

    if (!isAuth || !user) {
        return navigate('/authn')
    }

    useEffect(() => {
        const response = makeAttendee(user.id, qrHash)
        console.log('AttendeePage', response)
    }, [])


    return (<>

    </>)
}