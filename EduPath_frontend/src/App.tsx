import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/global.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
    </Routes>
  )
}

export default App
