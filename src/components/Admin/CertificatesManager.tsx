import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Award, Calendar, Building, Eye } from 'lucide-react';
import { supabase, Certificate } from '../../lib/supabase';
import toast from 'react-hot-toast';
import CertificateForm from './CertificateForm';

const CertificatesManager: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [previewCertificate, setPreviewCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching certificates:', error);
      } else {
        setCertificates(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este certificado?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setCertificates(prev => prev.filter(c => c.id !== id));
      toast.success('Certificado eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error('Error al eliminar el certificado');
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCertificate(null);
    fetchCertificates();
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
              <div className="skeleton w-1/2 h-4 rounded"></div>
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
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Certificados</h1>
          <p className="text-text-secondary mt-1">
            Administra tus certificaciones y logros académicos
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          Nuevo Certificado
        </motion.button>
      </div>

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No hay certificados aún
          </h3>
          <p className="text-text-secondary mb-6">
            Comienza agregando tus certificaciones y logros académicos.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Agregar Certificado
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden hover-lift group"
              >
                {/* Certificate Image */}
                <div className="relative">
                  <img
                    src={certificate.image_url}
                    alt={certificate.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      onClick={() => setPreviewCertificate(certificate)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 bg-white/90 text-gray-800 rounded-full"
                    >
                      <Eye className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h3 className="font-bold text-text-primary mb-2 line-clamp-2">
                    {certificate.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">{certificate.institution}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(certificate.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </div>

                  {certificate.description && (
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {certificate.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewCertificate(certificate)}
                      className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200"
                      title="Vista previa"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(certificate)}
                      className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors duration-200"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(certificate.id)}
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

      {/* Certificate Form Modal */}
      <CertificateForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        certificate={editingCertificate}
      />

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {previewCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewCertificate(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={previewCertificate.image_url}
                  alt={previewCertificate.title}
                  className="w-full h-auto object-contain"
                />
                
                <div className="p-6 bg-bg-primary">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {previewCertificate.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-text-secondary mb-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>{previewCertificate.institution}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(previewCertificate.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  {previewCertificate.description && (
                    <p className="text-text-secondary leading-relaxed">
                      {previewCertificate.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CertificatesManager;