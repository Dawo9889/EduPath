import { Outlet } from 'react-router-dom';
import './styles/global.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className='bg-primary min-h-screen' id='theme-root'>
      <NavBar />
      {location.pathname === '/' ? <Home/> : <Outlet />}
    </div>
  )
}

export default App
