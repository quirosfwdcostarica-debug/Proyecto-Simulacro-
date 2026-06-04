import React from 'react';
import { Globe, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandName}>Fundación Exalumnos UCR</h2>
          <p className={styles.copyright}>
            © 2024 Fundación Exalumnos UCR. Conectando generaciones.
          </p>
        </div>

        <div className={styles.linksSection}>
          <a href="#" className={styles.link}>About Us</a>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <a href="#" className={styles.link}>Terms of Service</a>
          <a href="#" className={styles.link}>Contact</a>
          <a href="#" className={styles.link}>UCR Official</a>
        </div>

        <div className={styles.socialSection}>
          <a href="#" className={styles.socialIcon}><Globe size={18} /></a>
          <a href="#" className={styles.socialIcon}><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
};
