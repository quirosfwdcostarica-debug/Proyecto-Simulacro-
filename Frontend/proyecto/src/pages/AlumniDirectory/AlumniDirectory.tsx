import React from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { AlumniFilters } from './components/AlumniFilters';
import { AlumniCard } from './components/AlumniCard';
import { Button } from '../../components/ui/Button/Button';
import { LayoutGrid, List } from 'lucide-react';
import styles from './AlumniDirectory.module.css';

const mockAlumni: Array<{
  id: string;
  name: string;
  role: string;
  company: string;
  degree: string;
  year: string;
  tags: string[];
  imageUrl: string;
  themeColor?: 'blue' | 'green' | 'darkblue';
}> = [
  {
    id: '1',
    name: 'Ana María Rodríguez',
    role: 'Director of Engineering',
    company: 'FinTech Global',
    degree: 'Ingeniería Eléctrica',
    year: '2012',
    tags: ['MENTORSHIP', 'HIRING'],
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    themeColor: 'blue'
  },
  {
    id: '2',
    name: 'Luis Fernando Soto',
    role: 'Senior Legal Counsel',
    company: 'United Nations',
    degree: 'Derecho',
    year: '2008',
    tags: ['POLICY ADVICE', 'PUBLIC SPEAKING'],
    imageUrl: 'https://i.pravatar.cc/150?img=11',
    themeColor: 'darkblue'
  },
  {
    id: '3',
    name: 'Karla Jiménez',
    role: 'Sustainability Lead',
    company: 'EcoCorp',
    degree: 'Administración',
    year: '2015',
    tags: ['MENTORSHIP', 'VOLUNTEERING'],
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    themeColor: 'green'
  },
  {
    id: '4',
    name: 'David Mora',
    role: 'Founder',
    company: 'TechVentures',
    degree: 'Computación',
    year: '2018',
    tags: ['INVESTMENT', 'HIRING'],
    imageUrl: 'https://i.pravatar.cc/150?img=12',
    themeColor: 'darkblue'
  }
];

export const AlumniDirectory: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      
      <main className={styles.mainContainer}>
        <div className={styles.sidebarWrapper}>
          <AlumniFilters />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>Directorio de Exalumnos</h1>
              <p className={styles.subtitle}>Encontrados: 1,482 profesionales conectados</p>
            </div>
            
            <div className={styles.controls}>
              <div className={styles.viewToggle}>
                <button className={`${styles.viewBtn} ${styles.active}`}><LayoutGrid size={20} /></button>
                <button className={styles.viewBtn}><List size={20} /></button>
              </div>
              <select className={styles.sortSelect}>
                <option>Relevancia</option>
                <option>Más recientes</option>
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            {mockAlumni.map(alumni => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>

          <div className={styles.loadMoreContainer}>
            <Button variant="outline">Cargar más exalumnos</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
