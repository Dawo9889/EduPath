import { Outlet } from 'react-router-dom';
import './styles/global.css'
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <NavBar />
      {location.pathname === '/' ? "Home" : <Outlet />}
    </>
  )
}

export default App
