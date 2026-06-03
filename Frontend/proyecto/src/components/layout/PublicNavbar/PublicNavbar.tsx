import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import styles from './PublicNavbar.module.css';

export const PublicNavbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.brandName}>Fundación Exalumnos UCR</span>
      </div>
      
      <div className={styles.navLinks}>
        <NavLink to="/dashboard" className={styles.navItem}>Dashboard</NavLink>
        <NavLink to="/students" className={styles.navItem}>Directory</NavLink>
        <NavLink to="/jobs" className={styles.navItem}>Jobs</NavLink>
        <NavLink to="/donations" className={styles.navItem}>Donations</NavLink>
      </div>

      <div className={styles.actions}>
        <Link to="/students" className={styles.loginLink}>Login</Link>
        <Button variant="primary">Register</Button>
      </div>
    </nav>
  );
};
