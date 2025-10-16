import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Code, Database, Globe, Shield, Palette, Terminal } from 'lucide-react';

const TechnologiesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('programming');

  const categories = [
    { id: 'programming', label: 'Programación', icon: Code },
    { id: 'database', label: 'Bases de Datos', icon: Database },
    { id: 'design', label: 'Diseño', icon: Palette },
    { id: 'networks', label: 'Redes y Seguridad', icon: Shield },
    { id: 'tools', label: 'Herramientas', icon: Terminal },
    { id: 'Hosting y Dominio', label: 'Hosting y Dominio', icon: Database },
  ];

  const technologies = [
    // Programming
    { name: 'JavaScript', category: 'programming', color: '#F7DF1E', level: 'Avanzado' },
    { name: 'Python', category: 'programming', color: '#3776AB', level: 'Intermedio' },
    { name: 'Java', category: 'programming', color: '#ED8B00', level: 'Intermedio' },
    { name: 'PHP', category: 'programming', color: '#777BB4', level: 'Intermedio' },
    { name: 'HTML5', category: 'programming', color: '#E34F26', level: 'Avanzado' },
    { name: 'CSS3', category: 'programming', color: '#1572B6', level: 'Avanzado' },
    { name: 'React', category: 'programming', color: '#61DAFB', level: 'Avanzado' },
    { name: 'Node.js', category: 'programming', color: '#339933', level: 'Intermedio' },
    
    // Databases
    { name: 'MySQL', category: 'database', color: '#4479A1', level: 'Avanzado' },
    { name: 'Oracle', category: 'database', color: '#F80000', level: 'Intermedio' },
    { name: 'SQL Server', category: 'database', color: '#CC2927', level: 'Intermedio' },
    { name: 'MongoDB', category: 'database', color: '#47A248', level: 'Básico' },
    { name: 'PostgreSQL', category: 'database', color: '#336791', level: 'Intermedio' },
    { name: 'Supabase', category: 'database', color: '#336791', level: 'Intermedio' },
    
    // Design Tools
    { name: 'AutoCAD', category: 'design', color: '#E51937', level: 'Avanzado' },
    { name: 'StarUML', category: 'design', color: '#FF6B6B', level: 'Intermedio' },
    { name: 'Figma', category: 'design', color: '#F24E1E', level: 'Intermedio' },
    { name: 'Balsamiq', category: 'design', color: '#A60000', level: 'Intermedio' },
    
    // Networks & Security
    { name: 'Cisco Packet Tracer', category: 'networks', color: '#1BA0D7', level: 'Avanzado' },
    { name: 'Wireshark', category: 'networks', color: '#1679A7', level: 'Intermedio' },
    { name: 'Linux', category: 'networks', color: '#FCC624', level: 'Intermedio' },
    
    // Tools & IDEs
    { name: 'Visual Studio Code', category: 'tools', color: '#007ACC', level: 'Avanzado' },
    { name: 'Git', category: 'tools', color: '#F05032', level: 'Avanzado' },
    { name: 'Docker', category: 'tools', color: '#2496ED', level: 'Intermedio' },
    { name: 'NetBeans', category: 'tools', color: '#1B6EC8', level: 'Intermedio' },
    { name: 'Eclipse', category: 'tools', color: '#2C2255', level: 'Intermedio' },

    // Hosting y Dominio
    { name: 'Netlify', category: 'Hosting y Dominio', color: '#1B6EC8', level: 'Intermedio' },
    { name: 'Firebase', category: 'Hosting y Dominio', color: '#2C2255', level: 'Intermedio' },
    
  ];

  const filteredTechnologies = technologies.filter(tech => tech.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="technologies" className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Tecnologías que <span className="text-gradient">Domino</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Un conjunto de aprendizaje de herramientas y tecnologías modernas para crear 
            soluciones digitales innovadoras y escalables.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-card-bg border border-card-border text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
          >
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                }}
                className="glass-card p-3 sm:p-4 md:p-6 text-center hover-lift group cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}15, transparent)`,
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${tech.color}20` }}
                >
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                </motion.div>
                
                <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-200">
                  {tech.name}
                </h3>
                
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  tech.level === 'Avanzado' 
                    ? 'bg-success/20 text-success'
                    : tech.level === 'Intermedio'
                    ? 'bg-accent/20 text-accent'
                    : 'bg-primary/20 text-primary'
                }`}>
                  {tech.level}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-card p-8 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">
            Stack Tecnológico Principal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)' }}>
                <Code className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-text-primary">Frontend</h4>
              <p className="text-text-secondary text-xs sm:text-sm">
                React, JavaScript, HTML5, CSS3, Tailwind CSS
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                <Database className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-text-primary">Backend & DB</h4>
              <p className="text-text-secondary text-sm">
                Node.js, Python, PostgreSQL, Supabase
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-text-primary">DevOps & Security</h4>
              <p className="text-text-secondary text-sm">
                Docker, Git, Netlify, Firebase, Pentesting Web
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;