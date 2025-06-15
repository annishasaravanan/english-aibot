import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/authentication-login-register';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/authentication-login-register');
    setIsUserMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      // Handle search logic here
      console.log('Search query:', searchQuery);
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="BookOpen" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-semibold text-text-primary hidden sm:block">
        LinguaLearn
      </span>
    </div>
  );

  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
        <div className="px-4 py-3">
          <Logo />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                name="search"
                placeholder="Search lessons, vocabulary..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all duration-200 ease-gentle focus:outline-none ${
                  isSearchFocused 
                    ? 'border-primary ring-2 ring-primary-100 bg-surface' :'border-border bg-surface-50 hover:bg-surface'
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </form>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
            onClick={() => {
              // Handle mobile search modal
              console.log('Open mobile search');
            }}
          >
            <Icon name="Search" size={20} className="text-text-secondary" />
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
            onClick={() => {
              // Handle notifications
              console.log('Open notifications');
            }}
          >
            <Icon name="Bell" size={20} className="text-text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          {/* User Avatar Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-text-secondary transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg animation-fade-in">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-secondary">john.doe@example.com</p>
                  </div>
                  
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center px-4 py-2 text-sm text-text-primary hover:bg-surface-100 transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} className="mr-3 text-text-secondary" />
                    Profile & Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      navigate('/personalized-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-text-primary hover:bg-surface-100 transition-colors duration-200"
                  >
                    <Icon name="BarChart3" size={16} className="mr-3 text-text-secondary" />
                    Progress Dashboard
                  </button>
                  
                  <div className="border-t border-border mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-error-light transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;