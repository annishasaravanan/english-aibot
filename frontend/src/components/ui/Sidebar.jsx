import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/personalized-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and progress'
    },
    {
      label: 'Chat',
      path: '/ai-chat-interface',
      icon: 'MessageCircle',
      description: 'AI conversation practice'
    },
    {
      label: 'Practice',
      path: '/vocabulary-learning-hub',
      icon: 'BookOpen',
      description: 'Vocabulary and exercises'
    },
    {
      label: 'Grammar',
      path: '/grammar-correction-tool',
      icon: 'CheckCircle',
      description: 'Grammar correction tool'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isAuthPage = location.pathname === '/authentication-login-register';

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-800 lg:flex-col transition-all duration-300 ease-gentle ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-1 bg-surface border-r border-border pt-16">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-text-primary">Navigation</h2>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={18} 
                className="text-text-secondary" 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200 ease-gentle group ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${
                      isActive ? 'text-primary-600' : 'text-text-secondary group-hover:text-text-primary'
                    }`}
                  />
                  
                  {!isCollapsed && (
                    <div className="ml-3 flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-primary-600' : 'text-text-primary'
                      }`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {isActive && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                <Icon name="TrendingUp" size={16} color="white" />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">Learning Streak</p>
                  <p className="text-xs text-accent-600 font-medium">7 days strong! 🔥</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-900 bg-surface border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 ease-gentle min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`mb-1 ${
                    isActive ? 'text-primary-600' : 'text-text-secondary'
                  }`}
                />
                <span className={`text-xs font-medium truncate ${
                  isActive ? 'text-primary-600' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;