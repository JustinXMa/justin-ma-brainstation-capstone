import './HomePage.scss'

export default function HomePage() {
    return (
        <main className="home-page">
            <h1 className="home-page__title">Welcome!</h1>
            <label htmlFor="" className="home-page__user"></label>
            <input type="text" className="home-page__user-input" />
            <button className="home-page__button"></button>
            <button className="home-page__button"></button>
        </main>
    )
}