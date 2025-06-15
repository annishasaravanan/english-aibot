import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationSection = ({ userData, onSave }) => {
  const [notifications, setNotifications] = useState({
    dailyReminders: userData.notifications.dailyReminders,
    achievementAlerts: userData.notifications.achievementAlerts,
    learningStreak: userData.notifications.learningStreak,
    reminderTime: userData.notifications.reminderTime,
    weeklyProgress: true,
    newFeatures: true,
    socialUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false
  });

  const handleToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleTimeChange = (time) => {
    setNotifications(prev => ({
      ...prev,
      reminderTime: time
    }));
  };

  const handleSave = () => {
    onSave(notifications);
  };

  const timeSlots = [
    { value: '07:00', label: '7:00 AM', description: 'Early morning' },
    { value: '09:00', label: '9:00 AM', description: 'Morning' },
    { value: '12:00', label: '12:00 PM', description: 'Lunch time' },
    { value: '18:00', label: '6:00 PM', description: 'Evening' },
    { value: '20:00', label: '8:00 PM', description: 'Night' },
    { value: '22:00', label: '10:00 PM', description: 'Late night' }
  ];

  const NotificationToggle = ({ title, description, setting, icon, color = 'primary' }) => (
    <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon name={icon} size={18} className={`text-${color}-600`} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{title}</h4>
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          notifications[setting] ? `bg-${color}` : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            notifications[setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Learning Notifications */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Learning Notifications</h3>
        <p className="text-sm text-text-secondary mb-6">
          Stay motivated with personalized learning reminders and progress updates
        </p>
        
        <div className="space-y-4">
          <NotificationToggle
            title="Daily Learning Reminders"
            description="Get reminded to practice English every day"
            setting="dailyReminders"
            icon="Clock"
            color="primary"
          />
          
          <NotificationToggle
            title="Achievement Alerts"
            description="Celebrate your milestones and accomplishments"
            setting="achievementAlerts"
            icon="Award"
            color="accent"
          />
          
          <NotificationToggle
            title="Learning Streak Notifications"
            description="Keep track of your consecutive learning days"
            setting="learningStreak"
            icon="Flame"
            color="secondary"
          />
          
          <NotificationToggle
            title="Weekly Progress Reports"
            description="Receive weekly summaries of your learning progress"
            setting="weeklyProgress"
            icon="TrendingUp"
            color="primary"
          />
        </div>
      </div>

      {/* Reminder Time */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Reminder Schedule</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose when you'd like to receive your daily learning reminders
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              onClick={() => handleTimeChange(slot.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                notifications.reminderTime === slot.value
                  ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{slot.label}</span>
                {notifications.reminderTime === slot.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              <span className="text-sm text-text-secondary">{slot.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* App Updates */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">App Updates</h3>
        <p className="text-sm text-text-secondary mb-6">
          Stay informed about new features and improvements
        </p>
        
        <div className="space-y-4">
          <NotificationToggle
            title="New Features"
            description="Be the first to know about exciting new features"
            setting="newFeatures"
            icon="Sparkles"
            color="secondary"
          />
          
          <NotificationToggle
            title="Social Updates"
            description="Get notified about community features and events"
            setting="socialUpdates"
            icon="Users"
            color="accent"
          />
        </div>
      </div>

      {/* Delivery Methods */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Delivery Methods</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose how you want to receive notifications
        </p>
        
        <div className="space-y-4">
          <NotificationToggle
            title="Email Notifications"
            description="Receive notifications via email"
            setting="emailNotifications"
            icon="Mail"
            color="primary"
          />
          
          <NotificationToggle
            title="Push Notifications"
            description="Get instant notifications on your device"
            setting="pushNotifications"
            icon="Smartphone"
            color="secondary"
          />
          
          <NotificationToggle
            title="SMS Notifications"
            description="Receive important updates via text message"
            setting="smsNotifications"
            icon="MessageSquare"
            color="accent"
          />
        </div>
      </div>

      {/* Notification Preview */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Preview</h3>
        <div className="space-y-3">
          {notifications.dailyReminders && (
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-primary-200">
              <Icon name="Clock" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-text-primary">Daily Reminder</p>
                <p className="text-xs text-text-secondary">
                  Time for your English practice! - {timeSlots.find(t => t.value === notifications.reminderTime)?.label}
                </p>
              </div>
            </div>
          )}
          
          {notifications.achievementAlerts && (
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-accent-200">
              <Icon name="Award" size={16} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-text-primary">Achievement Unlocked!</p>
                <p className="text-xs text-text-secondary">You've completed 7 days in a row! 🎉</p>
              </div>
            </div>
          )}
          
          {notifications.learningStreak && (
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-secondary-200">
              <Icon name="Flame" size={16} className="text-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">Streak Alert</p>
                <p className="text-xs text-text-secondary">Don't break your 12-day streak!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quiet Hours</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set times when you don't want to receive notifications
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quiet Hours Start
            </label>
            <select className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100">
              <option value="22:00">10:00 PM</option>
              <option value="23:00">11:00 PM</option>
              <option value="00:00">12:00 AM</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quiet Hours End
            </label>
            <select className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100">
              <option value="06:00">6:00 AM</option>
              <option value="07:00">7:00 AM</option>
              <option value="08:00">8:00 AM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSection;