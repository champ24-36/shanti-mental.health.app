import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Headphones, 
  Settings, 
  LogOut,
  Shield,
  Heart,
  Bell,
  Sparkles,
  UserCheck,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';
import AIInsightsPanel from './AIInsightsPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/chat', icon: MessageCircle, label: 'AI Support' },
    { path: '/psychiatrist', icon: UserCheck, label: 'Connect with Psychiatrist' },
    { path: '/resources', icon: Headphones, label: 'Resources' }
  ];

  const adminNavItems = [
    { path: '/admin', icon: Shield, label: 'Admin' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-lavender-50 dark:from-sage-900 dark:via-gray-900 dark:to-lavender-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-sage-100 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-br from-sage-600 to-lavender-600 dark:from-sage-500 dark:to-lavender-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">Shanti</span>
              <span className="text-xs text-sage-600 dark:text-sage-400 font-medium">Find Your Peace</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                Welcome, {user?.name}
              </span>
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-400 dark:text-gray-300 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              {/* AI Insights Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIInsights(true)}
                className="relative p-2 text-gray-400 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="AI Insights"
              >
                <Sparkles className="w-5 h-5" />
              </motion.button>
              
              {/* Notifications Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-400 dark:text-gray-300 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/settings')}
                className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 text-gray-400 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-r border-sage-100 dark:border-gray-700 min-h-screen sticky top-16 transition-colors duration-300">
          <div className="p-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-sage-600 to-lavender-600 dark:from-sage-500 dark:to-lavender-500 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-sage-50 dark:hover:bg-gray-700 hover:text-sage-700 dark:hover:text-sage-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              {user?.role === 'admin' && (
                <div className="pt-4 mt-4 border-t border-sage-100 dark:border-gray-700">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.div
                        key={item.path}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={item.path}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-700 dark:hover:text-purple-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* AI Insights Panel */}
      <AIInsightsPanel 
        isOpen={showAIInsights} 
        onClose={() => setShowAIInsights(false)} 
      />
    </div>
  );
};

export default Layout;