import './App.css'
import Layouts from './components/layouts/Layouts'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProudctPage from './pages/ProudctPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Layouts>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/products' element={<ProudctPage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path="*" element={
            <h1 className=' h-svh flex justify-center items-center text-4xl font-extrabold text-red-400'>404 Not Found</h1>
          } />
        </Routes>
    </Layouts>
  )
}

export default App
