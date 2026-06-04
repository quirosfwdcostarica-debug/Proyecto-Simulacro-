import React from 'react';
import styles from './AlumniFilters.module.css';

export const AlumniFilters: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>FILTROS</h3>
        <button className={styles.clearBtn}>Limpiar</button>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.label}>CARRERA UCR</label>
        <select className={styles.select}>
          <option>Todas las carreras</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.label}>INDUSTRIA</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <span>Tecnología</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <span>Finanzas</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked />
            <span>Educación</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <span>Sostenibilidad</span>
          </label>
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.label}>TIPO DE APOYO</label>
        <div className={styles.pillGroup}>
          <button className={`${styles.pill} ${styles.pillActive}`}>Mentorship</button>
          <button className={styles.pill}>Hiring</button>
          <button className={styles.pill}>Guest Speaking</button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.label}>PAÍS / UBICACIÓN</label>
        <input type="text" placeholder="Ej. Costa Rica, USA..." className={styles.input} />
      </div>

      <div className={styles.mentorPromo}>
        <div className={styles.promoIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
        </div>
        <h4 className={styles.promoTitle}>Sé un Mentor</h4>
        <p className={styles.promoText}>Comparte tu experiencia con las nuevas generaciones de la UCR.</p>
        <button className={styles.promoBtn}>Actualizar Perfil</button>
      </div>
    </aside>
  );
};
