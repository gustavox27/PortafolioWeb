import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from '../UI/FloatingButtons';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary bg-pattern">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default MainLayout;