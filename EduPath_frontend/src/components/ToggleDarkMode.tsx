import { useEffect, useState } from 'react'

function ToggleDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    // Check if dark mode is enabled in session storage
    useEffect(() => {
        const storedTheme = sessionStorage.getItem('theme');
        if (storedTheme && storedTheme === 'dark') {
            setDarkMode(true);
        }}
    , []);
    
      useEffect(() => {
        const root = window.document.getElementById('theme-root');
        if (root) {
          root.classList.remove('theme-light', 'theme-dark');
          root.classList.add(darkMode ? 'theme-dark' : 'theme-light');
          sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
        }
      }, [darkMode]);
    
      return (
        <>
            <input type='checkbox' id='darkmode-toggle' onClick={() => setDarkMode(!darkMode)} checked={darkMode} onChange={() => {}} />
            <label htmlFor='darkmode-toggle' className='toggle-label'></label>
        </>
      );
}

export default ToggleDarkMode