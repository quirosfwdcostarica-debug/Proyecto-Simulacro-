import React from 'react';
import { Button } from '../../../components/ui/Button/Button';
import { GraduationCap, UserPlus, Mail } from 'lucide-react';
import styles from './AlumniCard.module.css';

interface AlumniProps {
  id: string;
  name: string;
  role: string;
  company: string;
  degree: string;
  year: string;
  tags: string[];
  imageUrl: string;
  themeColor?: 'blue' | 'green' | 'darkblue';
}

export const AlumniCard: React.FC<{ alumni: AlumniProps }> = ({ alumni }) => {
  const getThemeClass = () => {
    switch(alumni.themeColor) {
      case 'green': return styles.themeGreen;
      case 'darkblue': return styles.themeDarkBlue;
      default: return styles.themeBlue;
    }
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.cardHeader} ${getThemeClass()}`}></div>
      
      <div className={styles.avatarContainer}>
        <img src={alumni.imageUrl} alt={alumni.name} className={styles.avatar} />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.name}>{alumni.name}</h3>
        <p className={styles.role}>{alumni.role}</p>
        <p className={styles.company}>{alumni.company}</p>

        <div className={styles.educationInfo}>
          <GraduationCap size={16} className={styles.eduIcon} />
          <span>{alumni.degree}, {alumni.year}</span>
        </div>

        <div className={styles.tagsContainer}>
          {alumni.tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" className={styles.connectBtn}>
            <span className={styles.btnContent}>
              <UserPlus size={18} />
              Connect
            </span>
          </Button>
          <button className={styles.iconBtn}>
            <Mail size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
