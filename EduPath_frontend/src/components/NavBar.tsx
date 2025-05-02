import { useEffect, useRef, useState } from 'react';

import UserRole from '../types/UserRole';
import LogoHorizontal from './LogoHorizontal';
import ToggleDarkMode from './ToggleDarkMode'


function NavBar() {

  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with authentication logic 
  const [username, setUsername] = useState('test'); // Replace with user data logic
  const [userRole, setUserRole] = useState<UserRole>('admin'); // Replace with user role logic

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
                  { label: 'Admin Dashboard', path: '/admin/dashboard' },
                  { label: 'Manage Users', path: '/admin/manage-users' },
                  { label: 'Account Settings', path: '/settings' },
                ];
              case 'lecturer':
                return [
                  { label: 'Lecturer Dashboard', path: '/lecturer/dashboard' },
                  { label: 'Manage Courses', path: '/lecturer/manage-courses' },
                  { label: 'Account Settings', path: '/settings' },
                ];
              case 'student':
                return [
                  { label: 'Student Dashboard', path: '/student/dashboard' },
                  { label: 'My Courses', path: '/student/courses' },
                  { label: 'Account Settings', path: '/settings' },
                ];
        default:
            return [];
        }
    };


  return (
    <div>
        <nav className="flex items-center justify-between p-4 bg-secondary">
            <div>
                <a href="/" >
                  <LogoHorizontal className='w-[200px] h-auto fill-[var(--primary-100)]'/>
                </a>
            </div>
            <div className="flex items-center space-x-4">
                <a href="/about" className="font-bold text-[var(--text-100)] hover:text-[var(--text-200)]">About</a>
                <a href="/contact" className="font-bold text-[var(--text-100)] hover:text-[var(--text-200)]">Contact</a>
                {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="cursor-pointer font-bold text-[var(--text-100)] hover:text-[var(--text-200)]"
              >
                {username}
              </button>
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-45 bg-tertiary text-[var(--text-100)] rounded shadow-lg z-10">
                  {getOptions().map((option, index) => (
                    <a
                        key={index}
                        href={option.path}
                        className="font-medium block px-4 py-2 hover:bg-[var(--bg-100)] rounded m-1"
                    >
                        {option.label}
                    </a>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="hover:text-secondary">Login</a>
          )}
                <ToggleDarkMode />
            </div>
        </nav>
    </div>
  )
}

export default NavBar