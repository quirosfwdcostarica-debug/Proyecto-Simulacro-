import React from 'react';
import { Button } from '../../../components/ui/Button/Button';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.badge}>CONEXIÓN QUE TRASCIENDE</div>
          <h1 className={styles.title}>
            Conectamos exalumnos UCR con estudiantes que transforman el futuro.
          </h1>
          <p className={styles.subtitle}>
            Únete a una red de impacto donde el conocimiento y la experiencia de ayer financian el potencial de mañana.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" className={styles.primaryBtn}>Registrarme como Exalumno</Button>
            <Button variant="outline" className={styles.outlineBtn}>Soy Estudiante</Button>
          </div>
        </div>

        <div className={styles.imageContent}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="UCR Alumni and Students" 
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
