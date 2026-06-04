import React from 'react';
import { Button } from '../../../components/ui/Button/Button';
import styles from './StudentCard.module.css';

interface StudentProps {
  id: string;
  name: string;
  career: string;
  location: string;
  projectName: string;
  projectDescription: string;
  progress: number;
  tags: string[];
  imageUrl: string;
}

export const StudentCard: React.FC<{ student: StudentProps }> = ({ student }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={student.imageUrl} alt={student.name} className={styles.avatar} />
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{student.name}</h3>
          <p className={styles.career}>{student.career}</p>
          <p className={styles.location}>{student.location}</p>
        </div>
      </div>

      <div className={styles.projectSection}>
        <p className={styles.projectLabel}>Proyecto de Graduación</p>
        <h4 className={styles.projectName}>{student.projectName}</h4>
        {student.projectDescription && (
          <p className={styles.projectDescription}>{student.projectDescription}</p>
        )}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progreso del Proyecto</span>
          <span className={styles.progressValue}>{student.progress}%</span>
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${student.progress}%` }}
          />
        </div>
      </div>

      <div className={styles.tagsContainer}>
        {student.tags.map((tag, idx) => (
          <span key={idx} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.actions}>
        <Button fullWidth variant="primary">
          <span className={styles.btnContent}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Offer Support
          </span>
        </Button>
      </div>
    </div>
  );
};
