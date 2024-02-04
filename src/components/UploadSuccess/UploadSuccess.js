import { useNavigate } from 'react-router-dom';
import './UploadSuccess.scss'

export default function UploadSuccess() {
    const navigate = useNavigate();
    const delay = 2000;
    setTimeout(() => {
        navigate('/list');
    }, delay);
    return (
        <section className="upload-success">
            <h2 className="upload-success__title">Upload Successful!</h2>
            <div className="upload-success__animation-container">
                <div className="upload-success__border">
                    <div className="upload-success__progress"></div>
                </div>
            </div>
        </section>
    )
}