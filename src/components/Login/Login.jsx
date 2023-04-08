import { Nav } from "../";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useRef, useState } from "react";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        const resp = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-type': 'application/json'},
        }).then((res) => res.json());

        if (resp === "Email and password are required") {
            setErrorMessage(resp);
            return;
        }
        if (resp === "Cannot find user") {
            setErrorMessage('There is no existing user with this email, please register');
            return;
        }
        if (resp === "Password is too short" || resp === "Incorrect password") {
            setErrorMessage('Incorrect password');
            return;
        }
        setEmail('');
        setPassword('');
        navigate('/posts');
    }
    
    return <div>
        <Nav />
        <div className={styles['login-div']}>
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
                    <button type="submit">Login</button>
                    <p className={styles['error']}>{errorMessage}</p>
                </div>
                <h4>
                    Don't have an account?
                    <Link to="/signup" className={styles['link']}> Sign Up</Link>
                </h4>
            </form>
        </div>
    </div>
}
