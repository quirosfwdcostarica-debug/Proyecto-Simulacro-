import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { StudentCard } from './components/StudentCard';
import { Button } from '../../components/ui/Button/Button';
import styles from './StudentDirectory.module.css';

// Mock data
const mockStudents = [
  {
    id: '1',
    name: 'Maria Gonzalez',
    career: 'Ingeniería de Software',
    location: 'Sede Rodrigo Facio',
    projectName: 'Plataforma de IA para Diagnóstico Rural',
    projectDescription: '',
    progress: 75,
    tags: ['Mentoría Técnica', 'Cloud Credits'],
    imageUrl: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '2',
    name: 'Carlos Mora',
    career: 'Arquitectura',
    location: 'Sede de Occidente',
    projectName: 'Vivienda Sostenible Modulada',
    projectDescription: '',
    progress: 40,
    tags: ['Modelado 3D', 'Materiales'],
    imageUrl: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '3',
    name: 'Elena Solano',
    career: 'Medicina',
    location: 'Sede Rodrigo Facio',
    projectName: 'Análisis de Datos en Salud Pública',
    projectDescription: '',
    progress: 90,
    tags: ['Pasantía Clínica', 'Red Contactos'],
    imageUrl: 'https://i.pravatar.cc/150?img=9'
  }
];

export const StudentDirectory: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        
        <main className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Directorio de Estudiantes</h1>
            <p className={styles.subtitle}>
              Conectando el talento emergente de la UCR con nuestra red global de exalumnos. Descubre proyectos innovadores y ofrece tu mentoría.
            </p>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchRow}>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, carrera o proyecto..." 
                  className={styles.searchInput}
                />
              </div>
              <Button variant="primary">
                <span className={styles.btnContent}>
                  <SlidersHorizontal size={18} />
                  Ver Filtros Avanzados
                </span>
              </Button>
            </div>

            <div className={styles.filtersRow}>
              <div className={styles.filterGroup}>
                <label>CARRERA</label>
                <select className={styles.select}>
                  <option>Todas las carreras</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>SEDE</label>
                <select className={styles.select}>
                  <option>Todas las sedes</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>APOYO REQUERIDO</label>
                <select className={styles.select}>
                  <option>Cualquier tipo</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>HABILIDADES</label>
                <select className={styles.select}>
                  <option>Todas</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {mockStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          <div className={styles.loadMoreContainer}>
            <Button variant="outline">Cargar más estudiantes</Button>
          </div>
        </main>
      </div>
    </div>
  );
};
