import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CraftingTable from '../../assets/icons/crafting-table.png'
import './Upload.scss';

export default function Upload() {
    const [buildName, setBuildName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('')
    const [preview, setPreview] = useState(null);

    const [errorBuildName, setErrorBuildName] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorInstructions, setErrorInstructions] = useState('')

    const navigate = useNavigate();

    const changeBuildName = (event) => {
        setBuildName(event.target.value)
        console.log('title:', buildName)
    }
    const changeCategory = (event) => {
        setCategory(event.target.value)
        console.log('category: ', category)
    }
    const changeDescription = (event) => {
        setDescription(event.target.value)
        console.log('description: ', description)
    }
    const changeInstructions = (event) => {
        setInstructions(event.target.value)
        console.log('instructions: ', instructions)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPreview(file);
    };

    const isBuildNameValid = () => {
        if (buildName.length === 1) {
            setErrorBuildName('Please title your tutorial');
        }
        return true;
    }
    const isCategoryValid = () => {
        if (category.length === 1) {
            setErrorCategory('Please select a category');
        }
        return true;
    }
    const isDescriptionValid = () => {
        if (description.length === 1) {
            setErrorDescription('Please add a description');
        }
        return true;
    }
    const isInstructionsValid = () => {
        if (instructions.length === 1) {
            setErrorInstructions('Please add instructions');
        }
        return true;
    }

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
            const newTutorial = {
                build_name: buildName,
                category: category,
                description: description,
                instructions: instructions,
            }
            await postTutorial(newTutorial)
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
                        {errorBuildName && <p className="upload__error">{errorBuildName}</p>}
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="category" className="upload__category">Category:</label>
                        <div className="upload__dropdown-container">
                            <select onChange={changeCategory} value={category} name="category" id="category" className="upload__dropdown-menu">
                                <option value="">--Please Select--</option>
                                <option value="Architecture">Architecture</option>
                                <option value="RedStone">RedStone</option>
                                <option value="Nature">Nature</option>
                            </select>
                            {errorCategory && <p className="upload__error">{errorCategory}</p>}
                        </div>
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="description" className="upload__description">Description:</label>
                        <textarea onChange={changeDescription} value={description} name="description" id="description" cols="30" rows="10" className="upload__description-input"></textarea>
                        {errorDescription && <p className="upload__error">{errorDescription}</p>}
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="instructions" className="upload__instructions">Instructions:</label>
                        <textarea onChange={changeInstructions} value={instructions} name="instructions" id="instructions" cols="30" rows="10" className="upload__instructions-input"></textarea>
                        {errorInstructions && <p className="upload__error">{errorInstructions}</p>}
                    </div>
                </div>
                <div className="upload__image-and-button-container">
                    <div className="upload__preview-container">
                        <label htmlFor="image" className='upload__preview'>Choose an image:</label>
                        <input onChange={handleFileChange} type="file" id="image" className='upload__preview-input' />
                    </div>
                    <button className="upload__button">Upload</button>
                </div>

            </form>
        </main>
    )
}