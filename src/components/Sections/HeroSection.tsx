import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Linkedin, Github, MapPin, Code2 } from 'lucide-react';
import { supabase, ProfileData } from '../../lib/supabase';

const HeroSection: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .maybeSingle();
        
        if (error) {
          // Only log errors that aren't "no data found" (PGRST116)
          if (error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
          }
          // For PGRST116 (no rows found), we'll use default values
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-secondary">Cargando perfil...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.p
                variants={itemVariants}
                className="text-primary font-semibold text-lg"
              >
                👋 Hola, soy
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
              >
                {profile?.name || 'Gustavo Corrales'}
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gradient font-semibold"
              >
                {profile?.title || 'Ingeniero de Sistemas e Informática'}
              </motion.h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
            >
              {profile?.bio || 'Especializado en desarrollo de software, ciberseguridad e infraestructura tecnológica. Apasionado por la innovación tecnológica y las soluciones de IA que transforman el futuro digital.'}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 text-text-secondary"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{profile?.location || 'Lima, Perú'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-secondary" />
                <span>Full Stack Developer</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
              >
                <Mail className="w-5 h-5" />
                Contáctame
              </motion.a>
              
              {profile?.cv_url && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Download className="w-5 h-5" />
                  Descargar CV
                </motion.a>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              {profile?.linkedin_url && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                </motion.a>
              )}
              
              {profile?.github_url && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                >
                  <Github className="w-6 h-6 text-text-primary" />
                </motion.a>
              )}
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${profile?.email || 'gustavo18n@hotmail.com'}`}
                className="p-3 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
              >
                <Mail className="w-6 h-6 text-secondary" />
              </motion.a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                <div className="w-full h-full rounded-full bg-bg-primary p-2">
                  <img
                    src={profile?.profile_image_url || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt={profile?.name || "Gustavo Corrales"}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-4 -left-4 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)'
                }}
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #2563EB)'
                }}
              >
                <span className="text-white font-bold text-lg">AI</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() => {
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3 rounded-full transition-colors duration-200"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
          >
            <ArrowDown className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;