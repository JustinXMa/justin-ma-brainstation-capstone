import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EnderEye from '../../assets/icons/ender-eye.png'
import MinecraftHeart from '../../assets/icons/minecraft-heart.png'
import './Tutorial.scss';

export default function Tutorial() {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5053/api/tutorials')
            setData(response.data);
        } catch (error) {
            console.log('get response issue: ', error)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <section className="tutorial">
            {data.map((tutorial) => (
                <div className="tutorial__main-container" key={tutorial.create_time}>
                    <div className="tutorial__title-and-category">
                        <div className="tutorial__title-and-creator">
                            <h2 className="tutorial__title">{tutorial.build_name}</h2>
                            <p className="tutorial__creator">By: {tutorial.build_creator}</p>
                        </div>
                        <p className="tutorial__category">{tutorial.category}</p>
                    </div>
                    <p className="tutorial__description">{tutorial.description}</p>
                    <Link to={`/tutorial/${tutorial.id}`}>
                        <img className='tutorial__preview' src={`http://localhost:5053/${tutorial.image_path}`} alt={tutorial.build_name} />
                    </Link>
                    <div className="tutorial__icon-container">
                        <div className="tutorial__views-container">
                            <img src={EnderEye} alt="" className="tutorial__icon" />
                            <span className="tutorial__views">{tutorial.views}</span>
                        </div>
                        <div className="tutorial__likes-container">
                            <button className="tutorial__like">
                                <img src={MinecraftHeart} alt="" className="tutorial__icon--heart" />
                            </button>
                            <span className="tutorial__likes">{tutorial.likes}</span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}