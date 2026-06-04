import React from 'react';
import { CircleDollarSign, GraduationCap, Users, Handshake } from 'lucide-react';
import styles from './StatsSection.module.css';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      icon: <CircleDollarSign size={24} />,
      value: '$2.4M+',
      label: 'TOTAL DONADO',
      description: 'Fondos destinados íntegramente a becas y proyectos de investigación.',
      iconColor: styles.iconBlue
    },
    {
      id: 2,
      icon: <GraduationCap size={24} />,
      value: '1,500+',
      label: 'ESTUDIANTES APOYADOS',
      description: 'Jóvenes talentosos que continúan su formación gracias a la red.',
      iconColor: styles.iconGreen
    },
    {
      id: 3,
      icon: <Users size={24} />,
      value: '8,200+',
      label: 'EXALUMNOS ACTIVOS',
      description: 'Profesionales comprometidos en más de 40 países diferentes.',
      iconColor: styles.iconBlue
    },
    {
      id: 4,
      icon: <Handshake size={24} />,
      value: '450+',
      label: 'MATCHES EXITOSOS',
      description: 'Programas de mentoría que resultaron en inserción laboral directa.',
      iconColor: styles.iconGreen
    }
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestra Huella en la Comunidad</h2>
          <p className={styles.subtitle}>Resultados tangibles de la solidaridad de nuestra red global.</p>
        </div>

        <div className={styles.grid}>
          {stats.map(stat => (
            <div key={stat.id} className={styles.card}>
              <div className={`${styles.iconWrapper} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <h3 className={styles.value}>{stat.value}</h3>
              <p className={styles.label}>{stat.label}</p>
              <p className={styles.description}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
