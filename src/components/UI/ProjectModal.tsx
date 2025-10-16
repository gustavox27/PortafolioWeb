import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Project } from '../../lib/supabase';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={project.image_url || 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg'}
                alt={project.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Proyecto Destacado
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  {project.title}
                </h2>
                <div className="flex items-center space-x-4 text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(project.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm capitalize">{project.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg">
                {project.description}
              </p>

              {/* Technologies */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
                  Tecnologías Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary font-medium rounded-lg border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demo_url && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ver Demo en Vivo
                  </motion.a>
                )}
                
                {project.github_url && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <Github className="w-5 h-5" />
                    Ver Código Fuente
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;