import React, {useState, useEffect, useMemo, useContext} from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

import {AppContextProvider, useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";
import Logger from "../../../internal/Logger";
import Loading from "../../../shared/loading/Loading";
import useAuthNew from "../../../context/hooks/authnew/useAuthNew";
import {useAuth} from "../../../app/AuthProvider";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SignIn({ }){

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')

    const {login, checkCode} = useAuth();
    const [tab, setTab] = useState('send-code')

    // const authHandler = useAuthNew();

    function loginA() {
        checkCode(email,code);
    }

    function sendCode() {
        const res = login(email)
        setTab('check-code')
        // res.then(r => console.log('SIGN IN RESPONSE',r))
        console.log(res)

    }
    // const [password, setPassword] = useState('');
    //
    // async function onSubmit(e){
    //     e.preventDefault();
    //     logger.log('submit:', { email, password });
    //
    //     setResponse(null);
    //     setError(null);
    //     setLoading(true);
    //
    //     signin({ email, password })
    //         .then((json) => {
    //             logger.log(json);
    //
    //             if(!json) {
    //                 return;
    //             }
    //
    //             if(json.status < 200 || json.status >= 300){
    //                 setError(json);
    //             }
    //             else {
    //                 // json null при успешном входе, клиента перенаправляет
    //                 setResponse(json);
    //             }
    //         })
    //         .catch((e) => setError(e))
    //         .finally(() => setLoading(false));
    // }
    //
    // useEffect(()=>{
    //     if(!error){
    //         return;
    //     }
    //
    //     // Эту проверку error лучше занести в функцию signin? Хотя это ухудшит понимание кода
    //     if(error.status === 409 && error.errors.some(err => Boolean(err.identity_provider_mismatch))){
    //         navigate('/authn/send-reset', {
    //             state: {
    //                 message: error.message,
    //                 email: email
    //             }
    //         });
    //     }
    //
    // }, [error])

    return (
        <div className="">
            {/*{loading && <Loading />}*/}
            {/*{error && <p>{error.message}</p>}*/}

            {tab === 'send-code' && <>
                <div>
                    <label>Email</label>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        placeHolder='Введите email'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <Button onClick={sendCode}>Продолжить</Button>
            </>}

            {tab === 'check-code' && <>
                <div>
                    <label>Verification code</label>
                    <Input
                        type="number"
                        name="verificationCode"
                        value={code}
                        placeHolder='Введите код из почты'
                        onChange={e => setCode(e.target.value)}
                        required
                    />
                </div>

                <Button onClick={loginA}>Продолжить</Button>
            </>}
        </div>
    );
}

