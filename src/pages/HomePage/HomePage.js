import { Link } from 'react-router-dom'
import './HomePage.scss'

export default function HomePage() {
    return (
        <main className="home-page">
            <div className="home-page__logo-container">
                <h1 className="home-page__title">WELCOME</h1>
            </div>
            <div className="home-page__input-container">
                <label htmlFor="user" className="home-page__user"></label>
                <input type="text" className="home-page__user-input" id='user' name='user' placeholder='Username or Email' />
                <label htmlFor="password" className="home-page__password"></label>
                <input type="password" className="home-page__password-input" id='password' name='password' placeholder='Password' />
                <button className="home-page__button">Login</button>
                <div className="home-page__alt-login-options-container">
                    <p className="home-page__sign-up">New here? <Link to='/signup' className="home-page__sign-up--link">Register</Link></p>
                    <p className='home-page__guest'>Continue as <Link to='/list' className='home-page__guest--link'>Guest</Link></p>
                </div>
            </div>
        </main>
    )
}