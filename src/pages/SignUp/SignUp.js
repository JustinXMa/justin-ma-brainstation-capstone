import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import './SignUp.scss';

export default function SignUp() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorUser, setErrorUser] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorSignUp, setErrorSignUp] = useState('');

    const navigate = useNavigate();

    const changeUser = (event) => {
        setUser(event.target.value);
        setErrorUser('');
        setErrorSignUp('');
    }
    const changeEmail = (event) => {
        setEmail(event.target.value);
        setErrorEmail('');
        setErrorSignUp('');
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
        setErrorPassword('');
        setErrorSignUp('');
    }
    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        setErrorConfirmPassword('');
        setErrorSignUp('');
    }

    const isUserValid = () => {
        if (user.length === 0) {
            setErrorUser('Please enter a username')
        }
        return true;
    }
    const isEmailValid = () => {
        if (email.length === 0) {
            setErrorEmail('Please enter an email')
        }
        return true;
    }
    const isPasswordValid = () => {
        if (password.length === 0) {
            setErrorPassword('Please enter a password')
        }
        return true;
    }
    const isPasswordMatching = () => {
        if (confirmPassword.length === 0) {
            setErrorConfirmPassword('Please enter a matching password')
        }
        if (password !== confirmPassword) {
            setErrorConfirmPassword('Passwords do not match')
        }
        return true;
    }

    const postSignUp = async (newUser) => {
        try {
            const response = await axios.post('http://localhost:5053/api/users/register', newUser)
            return response;
        } catch (error) {
            console.log('post sign up error: ', error)
            setUser('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validations = [
            isUserValid(),
            isEmailValid(),
            isPasswordValid(),
            isPasswordMatching()
        ]

        let error = false;
        validations.forEach((isValid) => {
            if (!isValid) {
                error = true;
            }
        })
        if (error) {
            return;
        }
        try {
            const newUser = {
                user_name: user,
                user_email: email,
                user_password: password
            };
            await postSignUp(newUser);
            const delay = 1000;
            setTimeout(() => {
                navigate('/login')
            }, delay);
        } catch (error) {
            console.log('sign up error: ', error)
            setErrorSignUp('Please make sure all fields are filled correctly')
        }
    }

    return (
        <main className="sign-up">
            <div className="sign-up__logo-container">
                <h2 className="sign-up__title">Welcome!</h2>
            </div>
            <form onSubmit={handleSubmit} className="sign-up__input-container">
                <label htmlFor="user" className="sign-up__user"></label>
                <input onChange={changeUser} value={user} type="text" className="sign-up__user-input" id='user' name='user' placeholder='Username' />
                {errorUser && <p className="home-page__error">{errorUser}</p>}
                <label htmlFor="email" className="sign-up__email"></label>
                <input onChange={changeEmail} value={email} type="text" className="sign-up__email-input" id='email' name='email' placeholder='Email' />
                {errorEmail && <p className="home-page__error">{errorEmail}</p>}
                <label htmlFor="password" className="sign-up__password"></label>
                <input onChange={changePassword} value={password} type="password" className="sign-up__password-input" id='password' name='password' placeholder='Password' />
                {errorPassword && <p className="home-page__error">{errorPassword}</p>}
                <label htmlFor="confirm-password" className="sign-up__password"></label>
                <input onChange={changeConfirmPassword} value={confirmPassword} type="password" className="sign-up__password-input" id='confirm-password' name='confirm-password' placeholder='Confirm Password' />
                {errorConfirmPassword && <p className="home-page__error">{errorConfirmPassword}</p>}
                <button className="sign-up__button">Register</button>
                {errorSignUp && <p className="home-page__error">{errorSignUp}</p>}
                <p className="sign-up__login">Already have an account? <Link to='/login'><span className="sign-up__login-link">Login</span></Link></p>
            </form>
        </main>
    )
}