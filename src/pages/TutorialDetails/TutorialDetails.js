import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Likes from '../../assets/icons/minecraft-heart.png'
import TEMP from '../../assets/images/background_6.png'
import './TutorialDetails.scss';

export default function TutorialDetails() {
    const [data, setData] = useState({})
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [instructions, setInstructions] = useState('');
    const [likes, setLikes] = useState(null)

    const { id: tutorialId } = useParams();
    const convertedId = parseInt(tutorialId)

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5053/api/tutorials/${convertedId}`)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log('error getting data: ', error)
        }
    }

    useEffect(() => {
        // console.log('Data State:', data);
        getData();
        // console.log('Data State:', data);
        // console.log('Build Name:', data.build_name);
        // console.log('User Name:', data.user_name);
        // console.log('Instructions:', data.instructions);
        // console.log('Likes:', data.likes);
        console.log('tutorail id is: ', tutorialId)
    }, [tutorialId])

    if (!data) {
        return <div>loading...</div>
    }

    return (
        <main className="tutorial-details">
            <div className="tutorial-details__main-container">
                <div className="tutorial-details__info-container">
                    <Link to='/list' >
                        <button className="tutorial-details__button">&lt;</button>
                    </Link>
                    <h3 className="tutorial-details__title">Build Name: {data.build_name}</h3>
                    <p className="tutorial-details__user">By: {data.build_creator}</p>
                    <p className="tutorial-details__instructions">Instructions: {data.instructions}</p>
                    <p className="tutorial-details__likes">Likes <img src={Likes} alt="likes icon" className="tutorial-details__likes-image" />: {data.likes}</p>
                </div>
                <img className="tutorial-details__preview" src={`http://localhost:5053/${data.image_path}`} alt={data.build_name} />
            </div>
        </main>
    )
}