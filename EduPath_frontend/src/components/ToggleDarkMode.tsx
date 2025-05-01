import { useEffect, useState } from 'react'

function ToggleDarkMode() {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem('theme') === 'dark'
      );
    
      useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
          root.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, [darkMode]);
    
      return (
        <>
            <input type='checkbox' id='darkmode-toggle' onToggle={() => setDarkMode(!darkMode)} />
            <label htmlFor='darkmode-toggle' className='toggle-label'></label>
        </>
        // <button
        //   onClick={() => setDarkMode(!darkMode)}
        //   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
        // >
        //   {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        // </button>
      );
}

export default ToggleDarkMode