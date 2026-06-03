import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Heart, User, Settings, HelpCircle } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Exalumnos UCR</h2>
        <p className={styles.subtitle}>Impacto y Legado</p>
      </div>

      <nav className={styles.navMenu}>
        <NavLink to="/dashboard" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/students" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Users size={20} />
          <span>Directory</span>
        </NavLink>
        <NavLink to="/matching" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>AI Matching</span>
        </NavLink>
        <NavLink to="/jobs" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Briefcase size={20} />
          <span>Jobs</span>
        </NavLink>
        <NavLink to="/donations" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Heart size={20} />
          <span>Donations</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className={styles.actionContainer}>
        <Button fullWidth>Start a Project</Button>
      </div>

      <div className={styles.bottomMenu}>
        <NavLink to="/settings" className={styles.navItem}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/help" className={styles.navItem}>
          <HelpCircle size={20} />
          <span>Help</span>
        </NavLink>
      </div>
    </aside>
  );
};
