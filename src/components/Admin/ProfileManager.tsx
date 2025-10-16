import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, User, Mail, MapPin, Linkedin, Github, FileText } from 'lucide-react';
import { supabase, ProfileData } from '../../lib/supabase';
import toast from 'react-hot-toast';

const ProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    id: '',
    name: 'Gustavo Corrales Conislla',
    title: 'Ingeniero de Sistemas e Informática',
    bio: 'Especializado en desarrollo de software, ciberseguridad e infraestructura tecnológica. Apasionado por la innovación tecnológica y las soluciones de IA que transforman el futuro digital.',
    email: 'gustavo18n@hotmail.com',
    phone: '+51 960 950 894',
    location: 'Lima, Perú',
    linkedin_url: 'https://linkedin.com/in/gustavo-corrales',
    github_url: 'https://github.com/gustavo-corrales',
    profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    cv_url: '',
    created_at: '',
    updated_at: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, keep default values
          console.log('No profile found, using default values');
        } else {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen debe ser menor a 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona una imagen válida');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profile_image_url: reader.result as string,
        }));
        toast.success('Imagen cargada. No olvides guardar los cambios.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const profileData = {
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        linkedin_url: profile.linkedin_url,
        github_url: profile.github_url,
        profile_image_url: profile.profile_image_url,
        cv_url: profile.cv_url,
        updated_at: new Date().toISOString(),
      };

      if (profile.id) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', profile.id);

        if (error) throw error;
        toast.success('Perfil actualizado exitosamente');
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('profiles')
          .insert([{
            ...profileData,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setProfile(data);
          toast.success('Perfil creado exitosamente');
        }
      }
      
      // Refresh the profile data
      await fetchProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton w-64 h-8 rounded"></div>
        <div className="glass-card p-6 space-y-4">
          <div className="skeleton w-full h-10 rounded"></div>
          <div className="skeleton w-full h-10 rounded"></div>
          <div className="skeleton w-full h-32 rounded"></div>
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
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Perfil</h1>
          <p className="text-text-secondary mt-1">
            Actualiza tu información personal y profesional
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
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
              <span>Guardar Cambios</span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Información Personal</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Título Profesional
                </label>
                <input
                  type="text"
                  name="title"
                  value={profile.title}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Ej. Ingeniero de Sistemas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone || ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="+51 999 999 999"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location || ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Lima, Perú"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Biografía Profesional
            </h2>
            <textarea
              name="bio"
              required
              value={profile.bio}
              onChange={handleInputChange}
              rows={6}
              className="textarea"
              placeholder="Describe tu experiencia, especialización y pasiones profesionales..."
            />
          </div>

          {/* Social Links */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Enlaces y Redes Sociales
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={profile.linkedin_url || ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="https://linkedin.com/in/tu-perfil"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </label>
                <input
                  type="url"
                  name="github_url"
                  value={profile.github_url || ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="https://github.com/tu-usuario"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="glass-card p-6 h-fit">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Foto de Perfil
          </h2>
          
          {/* Current Profile Image */}
          {profile.profile_image_url && (
            <div className="relative mb-4">
              <img
                src={profile.profile_image_url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL de la imagen
              </label>
              <input
                type="url"
                name="profile_image_url"
                value={profile.profile_image_url || ''}
                onChange={handleInputChange}
                className="input"
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadClick}
              type="button"
              className="btn btn-secondary w-full"
            >
              <Upload className="w-4 h-4" />
              Subir Nueva Foto
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileManager;