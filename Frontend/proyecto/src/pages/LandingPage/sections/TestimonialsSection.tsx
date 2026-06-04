import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "La beca de la fundación no fue solo un alivio económico; fue el voto de confianza que necesitaba para terminar mi carrera en Ingeniería Eléctrica. Hoy trabajo en energías renovables y ya estoy apadrinando a mi primer estudiante.",
      author: "Ana Lucía Vargas",
      role: "Graduada 2019 - Ingeniera Eléctrica",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 2,
      quote: "Ser mentor me ha permitido reconectar con mi alma mater de una forma que nunca imaginé. Ver el hambre de aprender de los estudiantes actuales me motiva a seguir innovando en mi propia empresa.",
      author: "Dr. Roberto Méndez",
      role: "Graduado 1995 - Director de Innovación",
      image: "https://i.pravatar.cc/150?img=11"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Historias de éxito</h2>
            <p className={styles.subtitle}>Voces que inspiran a nuestra comunidad a seguir creciendo juntos.</p>
          </div>
          <a href="#" className={styles.viewAllLink}>
            Ver todas las historias <ArrowRight size={16} />
          </a>
        </div>

        <div className={styles.grid}>
          {testimonials.map(item => (
            <div key={item.id} className={styles.card}>
              <Quote className={styles.quoteIcon} size={40} />
              <p className={styles.quoteText}>"{item.quote}"</p>
              
              <div className={styles.authorSection}>
                <img src={item.image} alt={item.author} className={styles.avatar} />
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{item.author}</h4>
                  <p className={styles.authorRole}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
