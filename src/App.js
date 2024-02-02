import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import SignUp from './pages/SignUp/SignUp';
import SignUpSuccess from './components/SignUpSuccess/SignUpSuccess';
import TutorialList from './pages/TutorialList/TutorialList';
import Upload from './pages/Upload/Upload'
import TutorialDetails from './pages/TutorialDetails/TutorialDetails';
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<HomePage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/redirecting' element={<SignUpSuccess />} />
          <Route path='/list' element={<TutorialList />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/tutorial/:id' element={<TutorialDetails />} />
          {/* <Route path='*' elemnt={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
