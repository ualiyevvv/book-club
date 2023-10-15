import {useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context);


    return (<>
        <input
            type="email"
            placeholder={'email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder={'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
        />
        <button onClick={() => store.login(email, password)}>sign in</button>
        <button onClick={() => store.registration(email, password)}>sign up</button>
    </>)
}

export default observer(LoginForm);