import Tutorial from '../../components/Tutorial/Tutorial'
import './TutorialList.scss';

export default function TutorialList() {
    return (
        <main className="tutorial-list">
            <div className="tutorial-list__banner">
                <h1 className="tutorial-list__title"></h1>
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