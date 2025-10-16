import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, ExternalLink, Github, Eye } from 'lucide-react';
import { supabase, Project } from '../../lib/supabase';
import toast from 'react-hot-toast';
import ProjectForm from './ProjectForm';

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Proyecto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error al eliminar el proyecto');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    fetchProjects(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton w-64 h-8 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="skeleton w-full h-32 rounded"></div>
              <div className="skeleton w-3/4 h-6 rounded"></div>
              <div className="skeleton w-full h-4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Proyectos</h1>
          <p className="text-text-secondary mt-1">
            Administra tu portafolio de proyectos
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          Nuevo Proyecto
        </motion.button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No hay proyectos aún
          </h3>
          <p className="text-text-secondary mb-6">
            Comienza agregando tu primer proyecto al portafolio.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Agregar Proyecto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden hover-lift group"
              >
                {/* Project Image */}
                <div className="relative">
                  <img
                    src={project.image_url || 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg'}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Destacado
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-bold text-text-primary mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-bg-tertiary text-text-muted text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200"
                          title="Ver demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                          title="Ver código"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(project)}
                        className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors duration-200"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors duration-200"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Form Modal */}
      {isFormOpen && (
        <ProjectForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          project={editingProject}
        />
      )}
    </motion.div>
  );
};

export default ProjectsManager;