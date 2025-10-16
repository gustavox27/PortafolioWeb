import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Github, Linkedin, X } from 'lucide-react';

const FloatingButtons: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: '#25D366',
      link: 'https://wa.me/51960950894?text=Hola%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo',
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      color: '#333333',
      link: 'https://github.com/gustavox27?tab=repositories',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      color: '#0A66C2',
      link: 'https://linkedin.com/in/gustavo-corrales-conislla-850662195/',
    },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3"
          >
            {buttons.map((button, index) => {
              const Icon = button.icon;
              return (
                <motion.a
                  key={button.id}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{ backgroundColor: button.color }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                  >
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      {button.label}
                    </span>
                    <div
                      className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent"
                      style={{ borderRightColor: 'var(--bg-primary)' }}
                    />
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
          ) : (
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
