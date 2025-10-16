import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('¡Mensaje enviado exitosamente! Te contactaré pronto.', {
        icon: '✅',
        duration: 4000,
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Inténtalo nuevamente.', {
        icon: '❌',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gustavo18n@hotmail.com',
      href: 'mailto:gustavo18n@hotmail.com',
      color: 'text-primary',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+51 960 950 894',
      href: 'tel:+51960950894',
      color: 'text-secondary',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Lima, Perú',
      href: '#',
      color: 'text-accent',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/gustavo-corrales-conislla-850662195/',
      color: 'hover:text-blue-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/gustavox27?tab=repositories',
      color: 'hover:text-gray-800',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:gustavo18n@hotmail.com',
      color: 'hover:text-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Hablemos de tu <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            ¿Tienes una idea innovadora? Me encantaría colaborar contigo para 
            crear soluciones tecnológicas que impulsen tu negocio.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="glass-card p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="¿De qué te gustaría hablar?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="textarea"
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      whileHover={{ x: 8 }}
                      className="flex items-center space-x-4 p-4 bg-bg-tertiary rounded-lg hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <div className={`p-3 bg-white/10 rounded-lg ${info.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{info.label}</p>
                        <p className="text-text-secondary">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Sígueme en redes
              </h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-all duration-200 ${social.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-4 sm:p-6 md:p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Disponible para proyectos
              </h3>
              <p className="text-text-secondary">
                Actualmente disponible para nuevas oportunidades y colaboraciones.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;