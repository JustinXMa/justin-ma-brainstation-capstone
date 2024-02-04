import { useNavigate } from 'react-router-dom';
import './SignUpSuccess.scss'

export default function SignUpSuccess() {
    const navigate = useNavigate();
    const delay = 2000;
    setTimeout(() => {
        navigate('/login');
    }, delay);
    return (
        <section className="sign-up-success">
            <h2 className="sign-up-success__title">Sign-up Successful!</h2>
            <div className="sign-up-success__animation-container">
                <div className="sign-up-success__border">
                    <div className="sign-up-success__progress"></div>
                </div>
            </div>
        </section>
    )
}