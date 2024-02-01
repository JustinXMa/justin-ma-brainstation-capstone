import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import './SignUp.scss';

export default function SignUp() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changeUser = (event) => {
        setUser(event.target.value);
    }
    const changeEmail = (event) => {
        setEmail(event.target.value);
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
    }
    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        console.log('hi')
    }

    return (
        <main className="sign-up">
            <div className="sign-up__logo-container">
                <h2 className="sign-up__title">Welcome!</h2>
            </div>
            <form onSubmit={handleSubmit} className="sign-up__input-container">
                <label htmlFor="user" className="sign-up__user"></label>
                <input onChange={changeUser} value={user} type="text" className="sign-up__user-input" id='user' name='user' placeholder='Username' />
                <label htmlFor="email" className="sign-up__email"></label>
                <input onChange={changeEmail} value={email} type="text" className="sign-up__email-input" id='email' name='email' placeholder='Email' />
                <label htmlFor="password" className="sign-up__password"></label>
                <input onChange={changePassword} value={password} type="password" className="sign-up__password-input" id='password' name='password' placeholder='Password' />
                <label htmlFor="confirm-password" className="sign-up__password"></label>
                <input onChange={changeConfirmPassword} value={confirmPassword} type="password" className="sign-up__password-input" id='confirm-password' name='confirm-password' placeholder='Confirm Password' />
                <button className="sign-up__button">Register</button>
                <p className="sign-up__login">Already have an account? <Link to='/login'><span className="sign-up__login-link">Login</span></Link></p>
            </form>
        </main>
    )
}