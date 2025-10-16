import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Image } from 'lucide-react';
import { supabase, Certificate } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface CertificateFormProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ isOpen, onClose, certificate }) => {
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    date: '',
    image_url: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title,
        institution: certificate.institution,
        date: certificate.date.split('T')[0], // Format for date input
        image_url: certificate.image_url,
        description: certificate.description || '',
      });
      setImagePreview(certificate.image_url);
      setImageFile(null);
    } else {
      setFormData({
        title: '',
        institution: '',
        date: '',
        image_url: '',
        description: '',
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [certificate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB');
      return;
    }

    setUploadingImage(true);
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setFormData(prev => ({
        ...prev,
        image_url: '', // Clear URL when uploading file
      }));
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image_url: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const certificateData = {
        ...formData,
        image_url: imageFile ? imagePreview : formData.image_url,
        updated_at: new Date().toISOString(),
      };

      if (certificate) {
        // Update existing certificate
        const { error } = await supabase
          .from('certificates')
          .update(certificateData)
          .eq('id', certificate.id);

        if (error) throw error;
        toast.success('Certificado actualizado exitosamente');
      } else {
        // Create new certificate
        const { error } = await supabase
          .from('certificates')
          .insert([{
            ...certificateData,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        toast.success('Certificado creado exitosamente');
      }

      onClose();
    } catch (error) {
      console.error('Error saving certificate:', error);
      toast.error('Error al guardar el certificado');
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
                {certificate ? 'Editar Certificado' : 'Nuevo Certificado'}
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
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Título del Certificado *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Ej. AWS Certified Solutions Architect"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Institución *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Ej. Amazon Web Services"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Fecha de Obtención *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Imagen del Certificado *
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-border-color"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-error text-white rounded-full hover:bg-error/80 transition-colors duration-200"
                      title="Remover imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {/* Upload Options */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="certificate-image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => document.getElementById('certificate-image-upload')?.click()}
                      disabled={uploadingImage}
                      className="btn btn-secondary disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                          <span>Cargando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Subir desde PC</span>
                        </div>
                      )}
                    </motion.button>
                    
                    <span className="text-text-muted text-sm">o</span>
                  </div>
                  
                  <div>
                    <input
                      type="url"
                      name="image_url"
                      required={!imageFile}
                      value={formData.image_url}
                      onChange={handleInputChange}
                      disabled={!!imageFile}
                      className="input disabled:opacity-50"
                      placeholder="https://ejemplo.com/certificado.jpg"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Descripción (Opcional)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea"
                  placeholder="Describe las habilidades o conocimientos adquiridos..."
                />
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
                      <span>{certificate ? 'Actualizar' : 'Crear'} Certificado</span>
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

export default CertificateForm;