import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './HomePage.scss'

export default function HomePage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [errorUser, setErrorUser] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState('')

    const navigate = useNavigate();

    const changeUser = (event) => {
        setUser(event.target.value);
        console.log(user)
        setErrorUser('');
        setErrorLogin('');

    }

    const changePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
        setErrorPassword('');
        setErrorLogin('');
    }

    const isValidUser = () => {
        if (user.length === 0) {
            setErrorUser('Please enter a username')
        }
        return true;
    }
    const isValidPassword = () => {
        if (password.length === 0) {
            setErrorPassword('Please enter a password')
        }
        return true;
    }

    const postLogin = async (data) => {
        try {
            const response = await axios.post('http://localhost:5053/api/users/login', data)
            console.log('what is this logging?', response.data);
            sessionStorage.setItem('token', response.data.token);
            return response;
        } catch (error) {
            console.log('login error: ', error)
            setUser('')
            setPassword('')
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validations = [
            isValidUser(),
            isValidPassword()
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
            const loginData = {
                user_name: user,
                user_password: password
            }
            await postLogin(loginData);

            const delay = 1000;
            setTimeout(() => {
                navigate('/list')
            }, delay);
        } catch (error) {
            console.log('form submission error: ', error);
            setErrorLogin('Please enter a valid username or password')
        }
    }

    return (
        <main className="home-page">
            <div className="home-page__logo-container">
                <h1 className="home-page__title">WELCOME</h1>
            </div>
            <form onSubmit={handleSubmit} className="home-page__form">
                <label htmlFor="user" className="home-page__user"></label>
                <input onChange={changeUser} value={user} type="text" className="home-page__user-input" id='user' name='user' placeholder='Username or Email' />
                {errorUser && <p className="home-page__error">{errorUser}</p>}
                <label htmlFor="password" className="home-page__password"></label>
                <input onChange={changePassword} value={password} type="password" className="home-page__password-input" id='password' name='password' placeholder='Password' />
                {errorPassword && <p className="home-page__error">{errorPassword}</p>}
                <button className="home-page__button">Login</button>
                {errorLogin && <p className="home-page__error">{errorLogin}</p>}
                <div className="home-page__alt-login-options-container">
                    <p className="home-page__sign-up">New here? <Link to='/signup' className="home-page__sign-up--link">Register</Link></p>
                    <p className='home-page__guest'>Continue as <Link to='/list' className='home-page__guest--link'>Guest</Link></p>
                </div>
            </form>
        </main>
    )
}