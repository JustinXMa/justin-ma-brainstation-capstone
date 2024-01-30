import CraftingTable from '../../assets/icons/crafting-table.png'
import './Upload.scss';

export default function Upload() {
    return (
        <main className="upload">
            <div className="upload__title-container">
                <h2 className="upload__title"> New Craft </h2>
                <img className='upload__crafting-table' src={CraftingTable} alt="Crafting Table" />
            </div>
            <form action="" className="upload__form">
                <div className="upload__content-container">
                    <div className="upload__input-container">
                        <label htmlFor="build" className="upload__build">Build Name:</label>
                        <input type="text" className="upload__build-input" id='build' name='build' />
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="category" className="upload__category">Category:</label>
                        <div className="upload__dropdown-container">
                            <select name="category" id="category" className="upload__dropdown-menu">
                                <option value="">--Please Select--</option>
                                <option value="Building">Building</option>
                                <option value="Base">Base</option>
                                <option value="Farm">Farm</option>
                            </select>
                        </div>
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="description" className="upload__description">Description:</label>
                        <textarea name="description" id="description" cols="30" rows="10" className="upload__description-input"></textarea>
                    </div>
                    <div className="upload__input-container">
                        <label htmlFor="instructions" className="upload__instructions">Instructions:</label>
                        <textarea name="instructions" id="instructions" cols="30" rows="10" className="upload__instructions-input"></textarea>
                    </div>
                    <button className="upload__button">Upload</button>
                </div>

            </form>
        </main>
    )
}