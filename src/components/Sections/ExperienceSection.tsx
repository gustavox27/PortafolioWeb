import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Eye, ExternalLink } from 'lucide-react';
import { supabase, Experience } from '../../lib/supabase';
import ExperienceModal from '../UI/ExperienceModal';

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Error fetching experiences:', error);
        setExperiences(getMockExperiences());
      } else {
        setExperiences(data || getMockExperiences());
      }
    } catch (error) {
      console.error('Error:', error);
      setExperiences(getMockExperiences());
    } finally {
      setLoading(false);
    }
  };

  const getMockExperiences = (): Experience[] => [
    {
      id: '1',
      company: 'TechSolutions Perú',
      position: 'Senior Software Engineer',
      description: 'Lideré el desarrollo de aplicaciones web empresariales y la implementación de arquitecturas de microservicios.',
      start_date: '2022-03-01',
      end_date: null,
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      achievements: [
        'Redujo el tiempo de carga de aplicaciones en 40%',
        'Implementó sistema de CI/CD que mejoró la productividad del equipo',
        'Lideró equipo de 5 desarrolladores'
      ],
      created_at: '2022-03-01',
      updated_at: '2024-01-15',
    },
    {
      id: '2',
      company: 'InnovateTech',
      position: 'Full Stack Developer',
      description: 'Desarrollé soluciones web completas y sistemas de gestión empresarial con enfoque en experiencia de usuario.',
      start_date: '2020-06-15',
      end_date: '2022-02-28',
      technologies: ['JavaScript', 'Python', 'MySQL', 'Vue.js', 'Django'],
      achievements: [
        'Desarrolló 15+ aplicaciones web exitosas',
        'Implementó medidas de seguridad que redujeron vulnerabilidades en 80%',
        'Colaboró con equipos multidisciplinarios'
      ],
      created_at: '2020-06-15',
      updated_at: '2022-02-28',
    },
    {
      id: '3',
      company: 'CyberGuard Solutions',
      position: 'Cybersecurity Analyst',
      description: 'Especialista en análisis de vulnerabilidades y implementación de medidas de seguridad informática.',
      start_date: '2019-01-10',
      end_date: '2020-05-30',
      technologies: ['Linux', 'Python', 'Wireshark', 'Metasploit', 'Nessus'],
      achievements: [
        'Identificó y mitigó 200+ vulnerabilidades críticas',
        'Implementó protocolos de seguridad empresarial',
        'Realizó auditorías de seguridad para 50+ empresas'
      ],
      created_at: '2019-01-10',
      updated_at: '2020-05-30',
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton w-64 h-12 mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton w-96 h-6 mx-auto rounded-lg"></div>
          </div>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-8">
                <div className="skeleton w-48 h-6 mb-4 rounded"></div>
                <div className="skeleton w-32 h-4 mb-4 rounded"></div>
                <div className="skeleton w-full h-4 mb-2 rounded"></div>
                <div className="skeleton w-3/4 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Experiencia <span className="text-gradient">Profesional</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Mi trayectoria profesional en el desarrollo de software y tecnología,
            con logros destacados en cada posición.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2 rounded-full"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={`relative flex items-stretch ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div
                  className={`absolute left-4 md:left-1/2 top-8 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-2 md:border-4 border-bg-secondary transform md:-translate-x-1/2 z-10 shadow-lg ${
                    !experience.end_date ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-primary rounded-full opacity-50 animate-ping"></div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`glass-card p-4 sm:p-5 md:p-6 ml-8 md:ml-0 hover-lift ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  } md:w-5/12`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1">
                        {experience.position}
                      </h3>
                      <p className="text-sm sm:text-base text-primary font-semibold">{experience.company}</p>
                    </div>
                    <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-text-secondary mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(experience.start_date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short'
                      })} - {
                        experience.end_date
                          ? new Date(experience.end_date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short'
                            })
                          : 'Presente'
                      }
                    </span>
                  </div>

                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {experience.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-[10px] sm:text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {experience.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-bg-tertiary text-text-muted text-xs font-medium rounded-full">
                        +{experience.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedExperience(experience)}
                    className="btn btn-secondary w-full text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="btn btn-primary inline-flex items-center"
          >
            <ExternalLink className="w-5 h-5" />
            Descargar CV Completo
          </motion.a>
        </motion.div>
      </div>

      <ExperienceModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </section>
  );
};

export default ExperienceSection;
