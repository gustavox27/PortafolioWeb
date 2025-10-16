import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus } from 'lucide-react';
import { supabase, Experience } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience | null;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ isOpen, onClose, experience }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    technologies: [] as string[],
    achievements: [] as string[],
  });
  const [newTech, setNewTech] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        start_date: experience.start_date.split('T')[0],
        end_date: experience.end_date ? experience.end_date.split('T')[0] : '',
        technologies: experience.technologies,
        achievements: experience.achievements,
      });
    } else {
      setFormData({
        company: '',
        position: '',
        description: '',
        start_date: '',
        end_date: '',
        technologies: [],
        achievements: [],
      });
    }
  }, [experience]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const experienceData = {
        ...formData,
        end_date: formData.end_date || null,
        updated_at: new Date().toISOString(),
      };

      if (experience) {
        // Update existing experience
        const { error } = await supabase
          .from('experiences')
          .update(experienceData)
          .eq('id', experience.id);

        if (error) throw error;
        toast.success('Experiencia actualizada exitosamente');
      } else {
        // Create new experience
        const { error } = await supabase
          .from('experiences')
          .insert([{
            ...experienceData,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        toast.success('Experiencia creada exitosamente');
      }

      onClose();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Error al guardar la experiencia');
    } finally {
      setSaving(false);
    }
  };

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
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <h2 className="text-2xl font-bold text-text-primary">
                {experience ? 'Editar Experiencia' : 'Nueva Experiencia'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
              >
                <X className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Nombre de la empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Posición *
                  </label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Tu cargo o posición"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    required
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="input"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Deja vacío si es tu trabajo actual
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea"
                  placeholder="Describe tus responsabilidades y el impacto de tu trabajo..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tecnologías Utilizadas
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="input flex-1"
                    placeholder="Ej. React, Python, AWS"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addTechnology}
                    className="btn btn-secondary px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-primary hover:text-error transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Logros y Resultados
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                    className="input flex-1"
                    placeholder="Describe un logro específico..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addAchievement}
                    className="btn btn-secondary px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-3 p-3 bg-bg-tertiary rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm flex-1">{achievement}</span>
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="text-text-muted hover:text-error transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border-color">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost"
                >
                  Cancelar
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {saving ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Guardando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Save className="w-5 h-5" />
                      <span>{experience ? 'Actualizar' : 'Crear'} Experiencia</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExperienceForm;