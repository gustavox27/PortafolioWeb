import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleReservedClick = () => {
    const now = Date.now();

    if (now - lastClickTime > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }

    setLastClickTime(now);

    if (clickCount + 1 === 3) {
      navigate('/admin/login');
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                Gustavo Corrales
              </span>
            </div>
            <p className="text-text-secondary max-w-md">
              Bachiller en Ingenieria de Sistemas especializado en desarrollo de software, 
              ciberseguridad e infraestructura tecnológica.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-text-primary">Enlaces Rápidos</h3>
            <div className="space-y-2">
              {[
                { label: 'Sobre Mí', href: '#about' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Certificados', href: '#certificates' },
                { label: 'Experiencia', href: '#experience' },
                { label: 'Contacto', href: '#contact' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>

          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-text-primary">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-5 h-5" />
                <span>gustavo18n@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-5 h-5" />
                <span>Lima, Perú</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/gustavo-corrales-conislla-850662195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 text-text-primary" />
                </a>
                <a
                  href="https://github.com/gustavox27?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                >
                  <Github className="w-5 h-5 text-text-primary" />
                </a>
                <a
                  href="mailto:gustavo18n@hotmail.com"
                  className="p-2 bg-card-bg border border-card-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-text-primary" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border-color"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p
              className="text-text-muted text-sm cursor-pointer select-none"
              onClick={handleReservedClick}
            >
              © 2023 Gustavo Corrales. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-2 text-text-muted text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-error" />
              <span>y mucho código</span>
              <Code className="w-4 h-4 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;