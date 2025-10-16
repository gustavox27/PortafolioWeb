import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Award, 
  Settings, 
  LogOut,
  Home,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileManager from './ProfileManager';
import ProjectsManager from './ProjectsManager';
import CertificatesManager from './CertificatesManager';
import ExperienceManager from './ExperienceManager';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'projects', label: 'Proyectos', icon: Briefcase },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'experience', label: 'Experiencia', icon: LayoutDashboard },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'experience':
        return <ExperienceManager />;
      default:
        return <ProfileManager />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile Header */}
      <div className="lg:hidden bg-bg-secondary border-b border-border-color p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-text-primary">Panel Admin</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-card-bg border border-card-border rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-bg-secondary border-r border-border-color transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-border-color">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Admin Panel</h2>
                  <p className="text-text-muted text-sm">Gestiona tu portafolio</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border-color space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 p-3 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                <span>Ver Portafolio</span>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 4 }}
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 text-error hover:bg-error/10 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;