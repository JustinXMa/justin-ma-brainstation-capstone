import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import CraftingTable from '../../assets/icons/crafting-table.png'
import './Upload.scss';

export default function Upload() {
    const [buildName, setBuildName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('')
    const [preview, setPreview] = useState(null);

    const [userData, setUserData] = useState(null)

    const navigate = useNavigate();

    const changeBuildName = (event) => {
        setBuildName(event.target.value)
    }
    const changeCategory = (event) => {
        setCategory(event.target.value)
    }
    const changeDescription = (event) => {
        setDescription(event.target.value)
    }
    const changeInstructions = (event) => {
        setInstructions(event.target.value)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('image is: ', file)
        setPreview(file);
    };

    const isBuildNameValid = () => {
        if (buildName.length === 1) {
            return false;
        }
        return true;
    }
    const isCategoryValid = () => {
        if (category.length === 1) {
            return false;
        }
        return true;
    }
    const isDescriptionValid = () => {
        if (description.length === 1) {
            return false;
        }
        return true;
    }
    const isInstructionsValid = () => {
        if (instructions.length === 1) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedUserData = JSON.parse(atob(token.split('.')[1]));
            console.log(decodedUserData)
            setUserData(decodedUserData);
        }
    }, []);

    const postTutorial = async (newContent) => {
        try {
            const response = await axios.post('http://localhost:5053/api/tutorials/upload', newContent);
            return response;
        } catch (error) {
            console.log('upload error: ', error)
            alert('please fill out all fields correctly')
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validations = [
            isBuildNameValid(),
            isCategoryValid(),
            isDescriptionValid(),
            isInstructionsValid()
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
            // const newTutorial = {
            //     build_name: buildName,
            //     build_creator: userData.user_credentials,
            //     category: category,
            //     description: description,
            //     instructions: instructions,
            //     image_path: preview,
            //     user_id: userData.id
            // }
            // console.log(newTutorial)

            const formData = new FormData();
            formData.append('image', preview);
            formData.append('build_name', buildName);
            formData.append('build_creator', userData.user_credentials);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('instructions', instructions);
            formData.append('user_id', userData.id);
            console.log(formData);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            await postTutorial(formData, config)
            const delay = 1000;
            setTimeout(() => {
                navigate('/list')
            }, delay);
        } catch (error) {
            console.log('submission error: ', error)
        }
    }
    return (
        <main className="upload">
            <div className="upload__title-container">
                <Link to='/list' >
                    <button className="upload__back-button">&lt;</button>
                </Link>
                <h2 className="upload__title"> New Craft </h2>
                <img className='upload__crafting-table' src={CraftingTable} alt="Crafting Table" />
            </div>
            <form onSubmit={handleSubmit} className="upload__form">
                <div className="upload__content-container">
                    <div className="upload__input-container">
                        <label htmlFor="build" className="upload__build">Build Name:</label>
                        <input onChange={changeBuildName} value={buildName} type="text" className="upload__build-input" id='build' name='build' />
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="category" className="upload__category">Category:</label>
                        <div className="upload__dropdown-container">
                            <select onChange={changeCategory} value={category} name="category" id="category" className="upload__dropdown-menu">
                                <option value="" disabled
                                >--Please Select--</option>
                                <option value="Architecture">Architecture</option>
                                <option value="RedStone">RedStone</option>
                                <option value="Nature">Nature</option>
                            </select>
                        </div>
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="description" className="upload__description">Description:</label>
                        <textarea onChange={changeDescription} value={description} name="description" id="description" cols="30" rows="10" className="upload__description-input"></textarea>
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="instructions" className="upload__instructions">Instructions:</label>
                        <textarea onChange={changeInstructions} value={instructions} name="instructions" id="instructions" cols="30" rows="10" className="upload__instructions-input"></textarea>
                    </div>
                </div>
                <div className="upload__image-and-button-container">
                    <div className="upload__preview-container">
                        <label htmlFor="image" className='upload__preview'>Choose an image:</label>
                        <input onChange={handleFileChange} type="file" id="image" accept='image/*' className='upload__preview-input' />
                    </div>
                    <button className="upload__button">Upload</button>
                </div>

            </form>
        </main>
    )
}