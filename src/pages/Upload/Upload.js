import CraftingTable from '../../assets/images/crafting-table.png'
import './Upload.scss';

export default function Upload() {
    return (
        <main className="upload">
            <div className="upload__title-container">
                <h2 className="upload__title"> New Craft </h2>
                <img className='upload__crafting-table' src={CraftingTable} alt="Crafting Table" />
            </div>
            <div className="upload__content-container">
                <div className="upload__input-container">
                    <label htmlFor="build" className="upload__build">Build Name:</label>
                    <input type="text" className="upload__build-input" id='build' name='build' />
                </div>
                <div className="upload__input-container">
                    <label htmlFor="description" className="upload__description">Description:</label>
                    <textarea name="description" id="description" cols="30" rows="10" className="upload__description-input"></textarea>
                </div>
                <div className="upload__input-container">
                    <label htmlFor="instructions" className="upload__instructions">Instructions:</label>
                    <textarea name="instructions" id="instructions" cols="30" rows="10" className="upload__instructions-input"></textarea>
                </div>
            </div>
        </main>
    )
}