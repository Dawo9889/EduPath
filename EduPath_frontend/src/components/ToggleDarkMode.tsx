import { useEffect, useState, useRef } from 'react';

function ToggleDarkMode() {
    // Initialize darkMode based on sessionStorage
    const initialTheme = sessionStorage.getItem('theme') === 'dark';
    const [darkMode, setDarkMode] = useState(initialTheme);

    // Track if component has mounted to disable animation on first render
    const isFirstRender = useRef(true);

    useEffect(() => {
        const root = document.getElementById('theme-root');
        if (root) {
            root.classList.remove('theme-light', 'theme-dark');
            root.classList.add(darkMode ? 'theme-dark' : 'theme-light');
            sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
        }

        // After initial render, allow animations
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [darkMode]);

    return (
        <>
            <input
                type="checkbox"
                id="darkmode-toggle"
                onClick={() => setDarkMode(!darkMode)}
                checked={darkMode}
                onChange={() => {}} // required to avoid React warning
                className={isFirstRender.current ? 'no-animate' : ''}
            />
            <label htmlFor="darkmode-toggle" className="toggle-label" />
        </>
    );
}

export default ToggleDarkMode;
