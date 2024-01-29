import './SignUp.scss';

export default function SignUp() {
    return (
        <main className="sign-up">
            <h2 className="sign-up__title"></h2>
            <div className="sign-up__input-container">
                <label htmlFor="user" className="sign-up__user"></label>
                <input type="text" className="sign-up__user-input" id='user' name='user' placeholder='Username' />
                <label htmlFor="password" className="sign-up__password"></label>
                <input type="password" className="sign-up__password-input" id='password' name='password' placeholder='Password' />
                <label htmlFor="confirm-password" className="sign-up__password"></label>
                <input type="password" className="sign-up__password-input" id='confirm-password' name='confirm-password' placeholder='Confirm Password' />
                <button className="sign-up__button">Register</button>
                <p className="sign-up__login">Already have an account? <Link><span className="sign-up__login-link">Login</span></Link></p>
            </div>
        </main>
    )
}