import { Outlet } from 'react-router-dom';
import './styles/global.css'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='bg-primary' id='theme-root'>
      <NavBar />
      {location.pathname === '/' ? "Home" : <Outlet />}
    </div>
  )
}

export default App
