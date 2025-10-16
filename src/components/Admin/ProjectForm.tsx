import React, { useState, useEffect } from 'react';
import { X, Upload, ExternalLink } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  featured: boolean;
}

interface ProjectFormProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectForm({ project, isOpen, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    category: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    featured: false,
  });

  const [techInput, setTechInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        category: project.category,
        image_url: project.image_url || '',
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        featured: project.featured,
      });
      if (project.image_url) {
        setImagePreview(project.image_url);
      }
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    setIsUploading(true);
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setFormData(prev => ({
        ...prev,
        image_url: result
      }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image_url: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProjectSubmit(formData, imageFile);
  };

  const handleProjectSubmit = async (projectData: Omit<Project, 'id'>, imageFile: File | null) => {
    try {
      let finalImageUrl = projectData.image_url;

      // If there's an image file, convert to base64 for storage
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          finalImageUrl = e.target?.result as string;
          await saveProject({ ...projectData, image_url: finalImageUrl });
        };
        reader.readAsDataURL(imageFile);
        return;
      }

      await saveProject({ ...projectData, image_url: finalImageUrl });
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const saveProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      const { supabase } = await import('../../lib/supabase');
      const toast = (await import('react-hot-toast')).default;

      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);

        if (error) throw error;
        toast.success('Proyecto actualizado exitosamente');
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast.success('Proyecto creado exitosamente');
      }

      onClose();
    } catch (error) {
      const toast = (await import('react-hot-toast')).default;
      console.error('Error saving project:', error);
      toast.error('Error al guardar el proyecto');
    }
  };

  const categories = [
    'programming',
    'database',
    'design',
    'networks',
    'tools'
  ];

  const categoryLabels: Record<string, string> = {
    programming: 'Programación',
    database: 'Bases de Datos',
    design: 'Diseño',
    networks: 'Redes y Seguridad',
    tools: 'Herramientas'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título del Proyecto
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category} value={category}>{categoryLabels[category]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tecnologías
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                placeholder="Agregar tecnología"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Imagen del Proyecto
            </label>
            
            {imagePreview ? (
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Sube una imagen desde tu PC o usa una URL
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Formatos: JPG, PNG, GIF (máx. 5MB)
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Subiendo...' : 'Subir desde PC'}
                </label>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">o</div>

              <input
                type="url"
                name="image_url"
                value={imageFile ? '' : formData.image_url}
                onChange={handleInputChange}
                disabled={!!imageFile}
                placeholder="URL de la imagen"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL de Demo
            </label>
            <input
              type="url"
              name="demo_url"
              value={formData.demo_url}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL de GitHub
            </label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleInputChange}
              placeholder="https://github.com/usuario/proyecto"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Proyecto destacado
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {project ? 'Actualizar' : 'Crear'} Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}