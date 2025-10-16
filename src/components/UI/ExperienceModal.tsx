import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { Experience } from '../../lib/supabase';

interface ExperienceModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, isOpen, onClose }) => {
  if (!experience) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="glass-card p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2">
                    {experience.position}
                  </h2>
                  <p className="text-lg sm:text-xl text-primary font-semibold mb-4">
                    {experience.company}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-text-secondary mb-6">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(experience.start_date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })} - {
                    experience.end_date
                      ? new Date(experience.end_date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long'
                        })
                      : 'Presente'
                  }
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
                    Descripción del Rol
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
                    Tecnologías y Herramientas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
                    Logros y Responsabilidades
                  </h3>
                  <ul className="space-y-3">
                    {experience.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-bg-tertiary rounded-lg"
                      >
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExperienceModal;
