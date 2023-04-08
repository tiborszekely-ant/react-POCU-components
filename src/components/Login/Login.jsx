import { Nav } from "../";
import { Button } from "../";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useRef, useState } from "react";
import { useAuth } from "../../features";
import { configureApi, ApiError } from "../../helpers/api.helper";
import clsx from 'clsx';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const { add: apiLogin } = configureApi('login');
    const { user, login } = useAuth();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const authResp = await apiLogin({email, password});
            login(authResp);
            navigate('/posts');
        } catch (e) {
            if (e instanceof ApiError) {
                setErrorMessage(e.message);
                return;
            }    
        }
    }

    return <div>
        <Nav />
        <div className={clsx({
                        [styles['login-div']]: user === null,
                        [styles['login-div-disabled']]: user !== null,
                    })}>
            <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                <h2><BsPersonFill size="2rem"/>Sign into your account</h2>
                <div><input 
                    type="email" 
                    placeholder="Email Address"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailChange}
                    />
                </div>
                <div><input 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    ref={passwordRef}
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <Button variant="smallWidth" type="submit">Login</Button>
                    <p className={styles.error}>{errorMessage}</p>
                </div>
                <h4>
                    Don't have an account?
                    <Link to="/signup" className={styles.link}> Sign Up</Link>
                </h4>
            </form>
        </div>
    </div>
}
