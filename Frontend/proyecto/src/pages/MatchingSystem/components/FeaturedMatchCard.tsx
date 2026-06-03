import React from 'react';
import { CheckCircle2, Handshake } from 'lucide-react';
import { Button } from '../../../components/ui/Button/Button';
import styles from './FeaturedMatchCard.module.css';

export const FeaturedMatchCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profileSection}>
          <div className={styles.avatarWrapper}>
            <img src="https://i.pravatar.cc/150?img=5" alt="Elena Rodriguez" className={styles.avatar} />
            <div className={styles.verifiedBadge}>
              <CheckCircle2 size={16} fill="#10b981" color="white" />
            </div>
          </div>
          <div>
            <h3 className={styles.name}>Elena Rodriguez</h3>
            <p className={styles.role}>Software Architect @ TechGlobal • Class of 2012</p>
          </div>
        </div>
        
        <div className={styles.gaugeWrapper}>
          <svg className={styles.gauge} viewBox="0 0 36 36">
            <path
              className={styles.gaugeBg}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={styles.gaugeProgress}
              strokeDasharray="98, 100"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className={styles.gaugeText}>98%</text>
          </svg>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.insightsColumn}>
          <h4 className={styles.sectionTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            AI MATCHING INSIGHTS
          </h4>
          <ul className={styles.insightsList}>
            <li>Both specialized in distributed systems.</li>
            <li>Mutually interested in "AI for Social Good".</li>
          </ul>
        </div>
        <div className={styles.skillsColumn}>
          <h4 className={styles.sectionTitle}>SKILLS & INTERESTS</h4>
          <div className={styles.tagsContainer}>
            <span className={styles.tag}>Cloud Architecture</span>
            <span className={styles.tag}>Python</span>
            <span className={styles.tag}>Strategic Planning</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.compatibilityBadge}>
          <Handshake size={16} />
          <span>Support Compatibility:<br/><strong>Exceptional</strong></span>
        </div>
        <div className={styles.actions}>
          <Button variant="ghost">View Profile</Button>
          <Button variant="primary">Message</Button>
        </div>
      </div>
    </div>
  );
};
