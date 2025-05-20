import { useEffect, useState, useRef } from 'react';

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function getInitialTheme(): boolean {
    // 1. Try cookie
    const cookieTheme = getCookie('theme');
    if (cookieTheme === 'dark') return true;
    if (cookieTheme === 'light') return false;
    // 2. Fallback to system/browser
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function ToggleDarkMode() {
    // Initialize darkMode based on sessionStorage
    // const initialTheme = sessionStorage.getItem('theme') === 'dark';
    const [darkMode, setDarkMode] = useState(getInitialTheme());

    // Track if component has mounted to disable animation on first render
    const isFirstRender = useRef(true);

    useEffect(() => {
        const root = document.getElementById('theme-root');
        if (root) {
            root.classList.remove('theme-light', 'theme-dark');
            root.classList.add(darkMode ? 'theme-dark' : 'theme-light');
            // Save to cookie
            document.cookie = `theme=${darkMode ? 'dark' : 'light'}; path=/;`;
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
