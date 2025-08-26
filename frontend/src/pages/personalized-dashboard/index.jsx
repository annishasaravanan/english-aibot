import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { toast } from 'react-toastify';

const PersonalizedDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/authentication-login-register');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/authentication-login-register');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/authentication-login-register');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Welcome{user.isGuest ? ' Guest' : `, ${user.name.split(' ')[0]}`}! 🎉
            </h2>
            <p className="text-text-secondary text-lg">
              {user.isGuest 
                ? "You're exploring EnglishAI Chat as a guest. Create an account to save your progress!"
                : "Ready to improve your English with AI-powered conversations?"
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="#3B82F6" />
                </div>
              )}
              <span className="text-text-primary font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div 
            className="bg-primary-100 rounded-xl shadow border border-primary-200 p-6 text-center hover:bg-primary-200 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/ai-chat-interface')}
          >
            <Icon name="MessageSquare" size={32} color="#3B82F6" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">Start AI Conversation</h3>
            <p className="text-primary-700">Practice speaking with our advanced AI tutor</p>
          </div>

          <div 
            className="bg-secondary-100 rounded-xl shadow border border-secondary-200 p-6 text-center hover:bg-secondary-200 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/vocabulary-learning-hub')}
          >
            <Icon name="BookOpen" size={32} color="#8B5CF6" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary mb-2">Practice Exercises</h3>
            <p className="text-secondary-700">Tailored lessons based on your skill level</p>
          </div>

          <div 
            className="bg-accent-100 rounded-xl shadow border border-accent-200 p-6 text-center hover:bg-accent-200 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/grammar-correction-tool')}
          >
            <Icon name="BarChart3" size={32} color="#F59E0B" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">View Progress</h3>
            <p className="text-accent-700">Monitor your improvement over time</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-surface rounded-xl shadow border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2" />
            Profile Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-text-secondary">Name</label>
                <p className="text-text-primary font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Email</label>
                <p className="text-text-primary font-medium">{user.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-text-secondary">Account Type</label>
                <p className="text-text-primary font-medium">
                  {user.isGuest ? 'Guest User' : 'Registered User'}
                </p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Email Verified</label>
                <div className="flex items-center">
                  <Icon 
                    name={'CheckCircle'} 
                    size={16} 
                    color={'#10B981'}
                    className="mr-1"
                  />
                  <span className={'text-green-600'}>
                    {'Verified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalizedDashboard;