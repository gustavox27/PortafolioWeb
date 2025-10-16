import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';
import { supabase, Experience } from '../../lib/supabase';
import toast from 'react-hot-toast';
import ExperienceForm from './ExperienceForm';

const ExperienceManager: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Error fetching experiences:', error);
      } else {
        setExperiences(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setExperiences(prev => prev.filter(e => e.id !== id));
      toast.success('Experiencia eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Error al eliminar la experiencia');
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingExperience(null);
    fetchExperiences();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton w-64 h-8 rounded"></div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="skeleton w-48 h-6 rounded"></div>
              <div className="skeleton w-32 h-4 rounded"></div>
              <div className="skeleton w-full h-4 rounded"></div>
              <div className="skeleton w-3/4 h-4 rounded"></div>
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
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Experiencia</h1>
          <p className="text-text-secondary mt-1">
            Administra tu experiencia profesional y logros
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          Nueva Experiencia
        </motion.button>
      </div>

      {/* Experiences List */}
      {experiences.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No hay experiencias registradas
          </h3>
          <p className="text-text-secondary mb-6">
            Comienza agregando tu experiencia profesional.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Agregar Experiencia
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-primary">
                          {experience.position}
                        </h3>
                        <p className="text-primary font-semibold">{experience.company}</p>
                        <div className="flex items-center space-x-2 text-text-secondary mt-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(experience.start_date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short'
                            })} - {
                              experience.end_date 
                                ? new Date(experience.end_date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'short'
                                  })
                                : 'Presente'
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-text-primary mb-2">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Logros:</h4>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-text-secondary text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(experience)}
                      className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors duration-200"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(experience.id)}
                      className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors duration-200"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Experience Form Modal */}
      <ExperienceForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        experience={editingExperience}
      />
    </motion.div>
  );
};

export default ExperienceManager;