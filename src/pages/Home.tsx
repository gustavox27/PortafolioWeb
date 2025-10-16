import React from 'react';
import HeroSection from '../components/Sections/HeroSection';
import AboutSection from '../components/Sections/AboutSection';
import TechnologiesSection from '../components/Sections/TechnologiesSection';
import ProjectsSection from '../components/Sections/ProjectsSection';
import CertificatesSection from '../components/Sections/CertificatesSection';
import ExperienceSection from '../components/Sections/ExperienceSection';
import ContactSection from '../components/Sections/ContactSection';

const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <ProjectsSection />
      <CertificatesSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Home;