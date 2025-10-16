import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Eye, Code2, Globe, Smartphone, Terminal } from 'lucide-react';
import { supabase, Project } from '../../lib/supabase';
import ProjectModal from '../UI/ProjectModal';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Todos', icon: Globe },
    { id: 'programming', label: 'Programación', icon: Code2 },
    { id: 'database', label: 'Bases de Datos', icon: Terminal },
    { id: 'design', label: 'Diseño', icon: Smartphone },
    { id: 'networks', label: 'Redes y Seguridad', icon: Code2 },
    { id: 'tools', label: 'Herramientas', icon: Terminal },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        // Use mock data if no data in Supabase
        setProjects(getMockProjects());
      } else {
        setProjects(data || getMockProjects());
      }
    } catch (error) {
      console.error('Error:', error);
      setProjects(getMockProjects());
    } finally {
      setLoading(false);
    }
  };

  const getMockProjects = (): Project[] => [
    {
      id: '1',
      title: 'Sistema de Gestión Empresarial',
      description: 'Plataforma web completa para gestión de recursos empresariales con dashboard analytics y reportes en tiempo real.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      category: 'web',
      image_url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
      demo_url: 'https://demo.example.com',
      github_url: 'https://github.com/example',
      featured: true,
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    },
    {
      id: '2',
      title: 'App de Monitoreo de Seguridad',
      description: 'Aplicación móvil para monitoreo en tiempo real de sistemas de seguridad y alertas automáticas.',
      technologies: ['React Native', 'Firebase', 'Python', 'Machine Learning'],
      category: 'mobile',
      image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      demo_url: 'https://demo.example.com',
      featured: true,
      created_at: '2024-02-01',
      updated_at: '2024-02-01',
    },
    {
      id: '3',
      title: 'Sistema de Análisis Geoespacial',
      description: 'Herramienta desktop para análisis y visualización de datos geoespaciales con integración GIS.',
      technologies: ['Python', 'QGIS', 'PostgreSQL', 'ArcGIS'],
      category: 'desktop',
      image_url: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      github_url: 'https://github.com/example',
      featured: false,
      created_at: '2024-03-01',
      updated_at: '2024-03-01',
    },
    {
      id: '4',
      title: 'Modelo Predictivo de Mantenimiento',
      description: 'Sistema de IA para predicción de mantenimiento de equipos industriales usando machine learning.',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'Docker'],
      category: 'ai',
      image_url: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg',
      demo_url: 'https://demo.example.com',
      featured: true,
      created_at: '2024-04-01',
      updated_at: '2024-04-01',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton w-64 h-12 mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton w-96 h-6 mx-auto rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 space-y-4">
                <div className="skeleton w-full h-48 rounded-lg"></div>
                <div className="skeleton w-3/4 h-6 rounded"></div>
                <div className="skeleton w-full h-4 rounded"></div>
                <div className="skeleton w-1/2 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Mis <span className="text-gradient">Proyectos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Una colección de proyectos que demuestran mi experiencia en desarrollo 
            de software, desde aplicaciones web hasta soluciones de IA.
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

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden hover-lift group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg'}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-white font-medium">Ver detalles</span>
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Destacado
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-bg-tertiary text-text-muted text-xs font-medium rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    {project.demo_url && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </motion.a>
                    )}
                    
                    {project.github_url && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center space-x-2 px-4 py-2 bg-card-bg border border-card-border text-text-primary rounded-lg hover:bg-bg-tertiary transition-colors duration-200 text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Código</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No hay proyectos en esta categoría
            </h3>
            <p className="text-text-secondary">
              Selecciona otra categoría para ver más proyectos.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;