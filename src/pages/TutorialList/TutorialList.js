import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tutorial from '../../components/Tutorial/Tutorial'
import Logo from '../../assets/icons/mycraft-logo.png'
import './TutorialList.scss';

export default function TutorialList() {
    const [logoutSignUp, setLogoutSignUp] = useState();

    const token = sessionStorage.getItem('token')
    const navigate = useNavigate();

    const handleUpload = () => {
        if (!token) {
            const goToLogin = window.confirm("You're not logged in! Would you like to login?")
            if (goToLogin) {
                navigate('/login')
            }
        } else {
            navigate('/upload')
        }
    }

    const setButtonDetails = () => {
        if (!token) {
            setLogoutSignUp('Sign Up')
        } else {
            setLogoutSignUp('Logout')
        }
    }

    useEffect(() => {
        setButtonDetails()
    }, [])

    const handleLogoutSignUp = () => {
        if (!token) {
            navigate('/signup')
        } else {
            sessionStorage.removeItem('token');
            navigate('/login');
        }

    }
    return (
        <main className="tutorial-list">
            <div className="tutorial-list__banner">
                <button onClick={handleLogoutSignUp} className="tutorial-list__logout-button">{logoutSignUp}</button>
                <img src={Logo} alt="" className="tutorial-list__logo" />
                {/* <div className="tutorial-list__search-container">
                    <label htmlFor="search" className='tutorial-list__search'></label>
                    <input type="text" className="tutorial-list__search-input" id='search' name='search' placeholder='Search' />
                </div> */}
                <button onClick={handleUpload} className="tutorial-list__upload-button">+ Upload</button>
            </div>
            <div className="tutorial-list__nav">
                <div className="tutorial-list__name-and-category">
                    <h2 className="tutorial-list__category tutorial-list__category--name">Build Name</h2>
                    <h2 className="tutorial-list__category">Category</h2>
                </div>
                <h2 className="tutorial-list__category">Description</h2>
                <h2 className="tutorial-list__category">Preview</h2>
                <div className="tutorial-list__views-and-likes">
                    <h2 className="tutorial-list__category">Views</h2>
                    <h2 className="tutorial-list__category">Likes</h2>
                </div>
            </div>
            <div className="tutorial-list__item">
                < Tutorial />
            </div>
        </main>
    )
}