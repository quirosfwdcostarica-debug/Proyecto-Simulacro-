import React from 'react';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>¿Cómo funciona la red?</h2>
          <p className={styles.subtitle}>Un camino sencillo para generar un cambio duradero.</p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.numberWrapper}>
              <div className={styles.number}>01</div>
            </div>
            <h3 className={styles.stepTitle}>Conectar</h3>
            <p className={styles.stepDesc}>
              Crea tu perfil profesional y encuentra estudiantes o mentores con intereses alineados a tu carrera y visión.
            </p>
          </div>

          <div className={styles.connector}></div>

          <div className={styles.step}>
            <div className={styles.numberWrapper}>
              <div className={`${styles.number} ${styles.numberGreen}`}>02</div>
            </div>
            <h3 className={styles.stepTitle}>Apoyar</h3>
            <p className={styles.stepDesc}>
              Aporta mediante donaciones mensuales, mentorías 1-a-1 o compartiendo oportunidades laborales exclusivas.
            </p>
          </div>

          <div className={styles.connector}></div>

          <div className={styles.step}>
            <div className={styles.numberWrapper}>
              <div className={`${styles.number} ${styles.numberGreen}`}>03</div>
            </div>
            <h3 className={styles.stepTitle}>Impactar</h3>
            <p className={styles.stepDesc}>
              Sé testigo de cómo tu legado permite que nuevos profesionales alcancen su máximo potencial profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
