import { Nav } from "../";
import { Button } from "../";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { configureApi, ApiError } from "../../helpers/api.helper";
import { useAuth } from "../../features";
import styles from './SignUp.module.css';
import clsx from 'clsx';

export function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [match, setMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const { add: apiRegister } = configureApi('register');
    const { user } = useAuth();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
        e.target.value === password ? setMatch(true) : setMatch(false);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    async function handleRegister(e) {
        e.preventDefault();
        if (confirmPassword === password) {
            try {
                await apiRegister({name, email, password});
                navigate('/login');
            } catch (e) {
                if (e instanceof ApiError) {
                    setErrorMessage(e.message);
                    return;
                }    
            }
        }
    }
    
    return <div>
        <Nav />
        <div className={clsx({
                        [styles['signup-div']]: user === null,
                        [styles['signup-div-disabled']]: user !== null,
                    })}>
            <form onSubmit={handleRegister}>
                <h1>Sign Up</h1>
                <h2><BsPersonFill size="2rem"/>Create your account</h2>
                <div><input 
                    type="text" 
                    placeholder="Name"
                    id="name"
                    ref={nameRef}
                    value={name}
                    onChange={handleNameChange}
                    />
                </div>
                <div><input 
                    type="email" 
                    placeholder="Email Address" 
                    className={styles['email-input']}
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailChange}
                    />
                </div>
                <p>This site uses Gravatar, so if you want a profile image, use a Gravatar email</p>
                <div><input 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    ref={passwordRef}
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div><input 
                    type="password" 
                    placeholder="Confirm Password"
                    className={styles['confirm-password-input']}
                    id="confirmPassword"
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    on
                    />
                </div>
                <p className={clsx({
                        [styles.match]: match === true,
                        [styles.notMatch]: match === false,
                    })}>Passwords do not match!</p>
                <div>
                    <Button type="submit">Register</Button>
                    <p className={styles.error}>{errorMessage}</p>
                </div>
                <h4>
                    Already have an account?
                    <Link to="/login" className={styles.link}> Sign In</Link>
                </h4>
            </form>
        </div>
    </div>
}
