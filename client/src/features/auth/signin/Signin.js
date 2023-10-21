import React, {useState, useEffect, useMemo, useContext} from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

import {AppContextProvider, useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";
import Logger from "../../../internal/Logger";
import Loading from "../../../shared/loading/Loading";
import useAuthNew from "../../../context/hooks/authnew/useAuthNew";
import {useAuth} from "../../../app/AuthProvider";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import Overlay from "../../../shared/ui/overlay/Overlay";
import useTimer from "../../../hooks/useTimer";
import Link from "../../../shared/ui/link/Link";
import Block from "../../../shared/ui/block/Block";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SignIn({ }){

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')

    const {status, setStatus, isLoading, error, setError, login, checkCode, authState, setAuthState} = useAuth();
    const [message, setMessage] = useState('');


    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isTryLink, setIsTryLink] = useState(false);

    useEffect(() => {
        if (error !== '') {
            startTimer(20)
            setIsTryLink(true)
        }
    }, []);
    useEffect(() => {
        let timer;

        if (isRunning) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                    // console.log(seconds)
                }
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [seconds, isRunning]);

    function startTimer (seconds) {
        setSeconds(seconds)
        setIsRunning(true);
    };


    function loginA(e) {
        e.preventDefault();

        const numericRegex = /^[0-9]+$/;
        const isNumericValid = numericRegex.test(code);
        if (code === '') {
            return setMessage('Введите код активации, отправленный на почту')
        } else if (!isNumericValid) {
            return setMessage('Код должен состоять из цифр')
        } else if (code.length > 6) {
            return setMessage('Код должен состоять из 6ти цифр')
        }

        checkCode(authState.email,code);
    }

    function sendCode(e) {
        e.preventDefault();
        setMessage('')
        setError('')

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailValid = emailRegex.test(email);
        if (email === '') {
            return setMessage('Введите email')
        } else if (!isEmailValid) {
            return setMessage('Введите валидный email')
        }

        setAuthState({
            ...authState,
            email,
        });
        const res = login(email);

        console.log(res)
        if (res.status) {
            console.log(res)
            setStatus(res.status);
        }
        // const res = await login(email)
        // startTimer(30)

        // setStatus(res.status)
    }

    function sentTry() {
        console.log('TRY', authState.email)
        if (authState.email) {
            const res = login(email);
            setIsTryLink(false)
        }
    }


    return (
        <div className="">
            {isLoading && <Overlay><Loading /></Overlay>}
            {error && <p>{error} <br/><br/> </p>}
            {message && <p>{message} <br/><br/> </p>}
            <form onSubmit={status ? loginA : sendCode}>
                {!status && <>
                    <div>
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            placeHolder='Введите email'
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {seconds < 1 &&
                        <Button type={'submit'}>Продолжить</Button>
                    }
                </>}

                {status && <>
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
                        <GroupInput>
                            <Button onClick={() => {setStatus(null)}} variant={'cancel'}>Отменить</Button>
                            {seconds < 1 &&
                                <Button type={'submit'}>Подтвердить</Button>
                            }
                        </GroupInput>
                        <br/>
                        {isTryLink && <Block isAlignCenter={true}>
                            <Link onClick={sentTry} text={'Отправить код повторно'} />
                        </Block>
                        }
                </>}
                { seconds > 0 &&
                    <p>Повторный запрос можно отправить через {seconds} секунд <br/></p>
                }
            </form>
        </div>
    );
}

