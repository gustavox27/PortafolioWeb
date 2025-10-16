import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, Building, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, Certificate } from '../../lib/supabase';

const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 6;

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
        setCertificates(getMockCertificates());
      } else {
        setCertificates(data || getMockCertificates());
      }
    } catch (error) {
      console.error('Error:', error);
      setCertificates(getMockCertificates());
    } finally {
      setLoading(false);
    }
  };

  const getMockCertificates = (): Certificate[] => [
    {
      id: '1',
      title: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      date: '2024-01-15',
      image_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      description: 'Certificación en arquitecturas de soluciones en la nube',
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    },
    {
      id: '2',
      title: 'Certified Ethical Hacker (CEH)',
      institution: 'EC-Council',
      date: '2023-11-20',
      image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      description: 'Certificación en hacking ético y seguridad informática',
      created_at: '2023-11-20',
      updated_at: '2023-11-20',
    },
    {
      id: '3',
      title: 'Google Cloud Professional',
      institution: 'Google Cloud',
      date: '2023-09-10',
      image_url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
      description: 'Certificación profesional en Google Cloud Platform',
      created_at: '2023-09-10',
      updated_at: '2023-09-10',
    },
    {
      id: '4',
      title: 'Machine Learning Specialization',
      institution: 'Stanford University',
      date: '2023-06-15',
      image_url: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg',
      description: 'Especialización en Machine Learning y Deep Learning',
      created_at: '2023-06-15',
      updated_at: '2023-06-15',
    },
    {
      id: '5',
      title: 'Cisco Certified Network Associate',
      institution: 'Cisco Systems',
      date: '2023-03-22',
      image_url: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg',
      description: 'Certificación en redes y infraestructura',
      created_at: '2023-03-22',
      updated_at: '2023-03-22',
    },
    {
      id: '6',
      title: 'React Developer Certification',
      institution: 'Meta',
      date: '2023-01-10',
      image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
      description: 'Certificación especializada en desarrollo con React',
      created_at: '2023-01-10',
      updated_at: '2023-01-10',
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(certificates.length - itemsPerView, prev + itemsPerView)
    );
  };

  const visibleCertificates = certificates.slice(currentIndex, currentIndex + itemsPerView);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + itemsPerView < certificates.length;

  if (loading) {
    return (
      <section id="certificates" className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton w-64 h-12 mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton w-96 h-6 mx-auto rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton w-full h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Mis <span className="text-gradient">Certificaciones</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Certificaciones y logros académicos que respaldan mi experiencia y
            conocimiento en tecnologías de vanguardia.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4"
            >
              {visibleCertificates.map((certificate) => (
                <motion.div
                  key={certificate.id}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="glass-card overflow-hidden hover-lift group cursor-pointer rounded-xl"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-2 sm:p-3">
                      <p className="text-white text-[10px] sm:text-xs font-semibold line-clamp-2 mb-1">
                        {certificate.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-[10px] sm:text-xs">{certificate.institution}</span>
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {certificates.length > itemsPerView && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={`p-3 rounded-full transition-all duration-300 ${
                  canGoPrevious
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                    : 'bg-card-bg text-text-muted cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.ceil(certificates.length / itemsPerView) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * itemsPerView)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / itemsPerView) === idx
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-card-border hover:bg-text-muted'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                disabled={!canGoNext}
                className={`p-3 rounded-full transition-all duration-300 ${
                  canGoNext
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                    : 'bg-card-bg text-text-muted cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-lg overflow-hidden shadow-2xl" style={{ background: 'var(--bg-primary)' }}>
                <div className="relative">
                  <img
                    src={selectedCertificate.image_url}
                    alt={selectedCertificate.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                    {selectedCertificate.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-text-secondary mb-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 flex-shrink-0" />
                      <span>{selectedCertificate.institution}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {new Date(selectedCertificate.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  {selectedCertificate.description && (
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
