import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import SignUp from './pages/SignUp/SignUp';
import './App.scss';
import TutorialList from './pages/TutorialList/TutorialList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<HomePage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/list' element={<TutorialList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
