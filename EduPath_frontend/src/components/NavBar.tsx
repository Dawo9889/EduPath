import { useEffect, useRef, useState } from 'react';

import LogoHorizontal from './LogoHorizontal';
import ToggleDarkMode from './ToggleDarkMode'
import { useAuth } from '../contexts/AuthContext';


function NavBar() {

  const { isAuthenticated, username, userRole, logout } = useAuth();

  const displayUsername: string =
    username && username.length > 11
      ? username.toLowerCase().slice(0, 8) + '...'
      : username || '';

  // Get current location
  const isActive = (path: string) => location.pathname.startsWith(path);

  // Dropdown with options depending on user role
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Get options depending on user role
    const getOptions = () => {
        switch (userRole) {
            case 'admin':
                return [
                  { label: 'Dashboard', path: '/admin/dashboard' },
                  { label: 'Manage Users', path: '/admin/manage-users' },
                  { label: 'Account Settings', path: '/settings' },
                ];
              case 'lecturer':
                return [
                  { label: 'Dashboard', path: '/lecturer/dashboard' },
                  { label: 'Manage Courses', path: '/lecturer/manage-courses' },
                  { label: 'Account Settings', path: '/settings' },
                ];
              case 'student':
                return [
                  { label: 'Dashboard', path: '/student/dashboard' },
                  { label: 'My Courses', path: '/student/courses' },
                  { label: 'Account Settings', path: '/settings' },
                ];
        default:
            return [];
        }
    };


  return (
    <div className='fixed p-4 w-full z-45 min-w-[800px]'>
        <nav className="flex items-center justify-between p-4 bg-secondary rounded-4xl shadow-md z-50">
            <div className='mx-2'>
                <a href="/" >
                  <LogoHorizontal className='w-[200px] h-auto fill-[var(--primary-100)] hover:brightness-85 transition-filter duration-500 ease-in-out'/>
                </a>
            </div>
            <div className="flex items-center">
              <a
                  href="/about"
                  className={`font-bold text-xl px-4 py-2 rounded-2xl transition-colors duration-500 ease-in-out mx-3 ${
                    isActive('/about') 
                      ? 'bg-[var(--bg-300)] text-[var(--text-100)] hover:bg-[var(--bg-400)]' 
                      : 'text-[var(--text-100)] hover:bg-[var(--bg-100)]'
                  }`}
                >
                  About
              </a>
                <a 
                  href="/contact"
                  className={`font-bold text-xl px-4 py-2 rounded-2xl transition-colors duration-500 ease-in-out mx-3 ${
                    isActive('/contact') 
                      ? 'bg-[var(--bg-300)] text-[var(--text-100)] hover:bg-[var(--bg-400)]' 
                      : 'text-[var(--text-100)] hover:bg-[var(--bg-100)]'
                  }`}
                >
                Contact</a>
                {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                  className={`font-bold text-xl px-4 py-2 rounded-2xl transition-colors duration-500 ease-in-out mx-3 cursor-pointer ${
                    openDropdown 
                      ? 'bg-[var(--bg-100)] text-[var(--text-100)] hover:bg-[var(--bg-400)]' 
                      : 'text-[var(--text-100)] hover:bg-[var(--bg-100)]'
                  }`}
                >
                {displayUsername}
              </button>
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-45 bg-tertiary text-[var(--text-100)] rounded-xl shadow-lg z-10">
                  {getOptions().map((option, index) => (
                    <a
                        key={index}
                        href={option.path}
                        className="font-medium block px-4 py-2 hover:bg-[var(--bg-100)] rounded-xl m-1 cursor-pointer"
                    >
                        {option.label}
                    </a>
                    ))}
                    <a 
                        onClick={logout}
                        className="font-medium block px-4 py-2 hover:bg-[var(--bg-100)] rounded-xl m-1 cursor-pointer"
                    >
                        Logout
                    </a>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="font-bold text-xl text-[var(--text-100)] hover:text-[var(--text-200)] mx-5">Login</a>
          )}
                <div className='justify-center flex items-center mx-3'>
                  <ToggleDarkMode />
                </div>
                
            </div>
        </nav>
    </div>
  )
}

export default NavBar