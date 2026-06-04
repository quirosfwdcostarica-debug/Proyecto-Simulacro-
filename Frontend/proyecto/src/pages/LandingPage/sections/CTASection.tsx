import React from 'react';

import styles from './CTASection.module.css';

export const CTASection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>¿Listo para dejar tu huella?</h2>
        <p className={styles.subtitle}>
          Únete a miles de exalumnos que ya están construyendo el futuro de la educación en Costa Rica.
        </p>
        <div className={styles.actions}>
          <button className={styles.greenBtn}>Crear mi cuenta</button>
          <button className={styles.outlineBtn}>Solicitar información</button>
        </div>
      </div>
    </section>
  );
};
