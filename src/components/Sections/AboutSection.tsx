import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, TrendingUp, Shield, Code2, Database, Globe } from 'lucide-react';

const AboutSection: React.FC = () => {
  const competencies = [
    {
      icon: Code2,
      title: 'Desarrollo de Software',
      description: 'Creación de aplicaciones web y móviles con tecnologías modernas para optimizacion de procesos empresariales'
    },
    {
      icon: Database,
      title: 'Análisis de Datos',
      description: 'Procesamiento y análisis de grandes volúmenes de información'
    },
    {
      icon: Users,
      title: 'Metodologías Ágiles',
      description: 'Implementación de Scrum y DevOps para desarrollo eficiente'
    },
    {
      icon: TrendingUp,
      title: 'Liderazgo',
      description: 'Gestión de equipos y proyectos tecnológicos complejos'
    },
    {
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'Implementación de medidas de seguridad y protección de datos'
    },
    {
      icon: Globe,
      title: 'Infraestructura TI',
      description: 'Diseño y gestión de arquitecturas tecnológicas escalables'
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Sobre <span className="text-gradient">Mí</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Soy un profesional apasionado por la tecnología y la innovación, con amplia experiencia 
              en el desarrollo de soluciones digitales que impulsan la transformación empresarial.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Professional Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-4 sm:p-6 md:p-8 hover-lift">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-8 h-8 text-primary" />
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">Mi Enfoque</h3>
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Me especializo en crear soluciones tecnológicas innovadoras que combinan 
                  desarrollo de software de vanguardia, robustas medidas de ciberseguridad 
                  y arquitecturas de infraestructura escalables.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">+2 años de experiencia en desarrollo de software</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-text-secondary">Estudios en ciberseguridad e infraestructura</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-text-secondary">Enfoque en innovación tecnológica y IA</span>
                  </div>
                </div>
              </div>

              <motion.div 
                variants={itemVariants}
                className="glass-card p-4 sm:p-6 md:p-8 hover-lift"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-accent" />
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">Innovación y IA</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Constantemente explorando las últimas tendencias en inteligencia artificial 
                  y tecnologías emergentes para desarrollar soluciones que marquen la diferencia 
                  en la transformación digital empresarial.
                </p>
              </motion.div>
            </motion.div>

            {/* Competencies Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8 text-center lg:text-left">
                Competencias Clave
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {competencies.map((competency, index) => {
                  const Icon = competency.icon;
                  return (
                    <motion.div
                      key={competency.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="glass-card p-4 sm:p-5 md:p-6 hover-lift group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-text-primary">
                          {competency.title}
                        </h4>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {competency.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16"
          >
            {[
              { number: '13+', label: 'Proyectos Completados' },
              { number: '8+', label: 'Tecnologías Dominadas' },
              { number: '3+', label: 'Años de Experiencia' },
              { number: '10+', label: 'Certificaciones' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center glass-card p-3 sm:p-4 md:p-6 hover-lift"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-text-secondary font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
