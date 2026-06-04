import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell, Settings, Search, Home } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isAlumniPage = location.pathname === '/alumni';
  const isMatchingPage = location.pathname === '/matching';

  if (isMatchingPage) {
    return (
      <nav className={`${styles.navbar} ${styles.matchingNavbar}`}>
        <div className={styles.matchingSearchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search matches by skill or interest..." 
            className={styles.matchingSearchInput} 
          />
        </div>

        <div className={styles.actions}>
          <NavLink to="/" className={styles.iconBtn} title="Ir al inicio"><Home size={20} /></NavLink>
          <button className={styles.iconBtn}><Bell size={20} /></button>
          <button className={styles.iconBtn}><Settings size={20} /></button>
          <div className={styles.avatar}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.brandName}>Fundación Exalumnos UCR</span>
      </div>
      
      <div className={styles.navLinks}>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? styles.active : ''}>Dashboard</NavLink>
        <NavLink to="/students" className={({isActive}) => isActive || location.pathname === '/' ? styles.active : ''}>Directory</NavLink>
        <NavLink to="/jobs" className={({isActive}) => isActive ? styles.active : ''}>Jobs</NavLink>
        <NavLink to="/donations" className={({isActive}) => isActive ? styles.active : ''}>Donations</NavLink>
      </div>

      <div className={styles.actions}>
        {isAlumniPage && (
          <div className={styles.searchContainer}>
             <input type="text" placeholder="Search directory..." className={styles.topSearch} />
          </div>
        )}
        <NavLink to="/" className={styles.iconBtn} title="Ir al inicio"><Home size={20} /></NavLink>
        <button className={styles.iconBtn}><Bell size={20} /></button>
        <button className={styles.iconBtn}><Settings size={20} /></button>
        <div className={styles.avatar}>
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};
