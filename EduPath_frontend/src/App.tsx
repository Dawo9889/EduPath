import { Outlet } from 'react-router-dom';
import './styles/global.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className='bg-primary min-h-screen' id='theme-root'>
      <NavBar />
      <div className='fixed top-0 left-0 w-full h-[100px] z-10 transition-all duration-300 pointer-events-none backdrop-blur-xs'
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
      }}></div> { /* blurred background */}
      <div className='h-[110px]'></div>
      {location.pathname === '/' ? <Home/> : <Outlet />}
    </div>
  )
}

export default App
